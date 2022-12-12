import SpaceCollection from "../space/collection";
import type { Request, Response, NextFunction } from "express";

import type { HydratedDocument } from "mongoose";

import CheckInCollection from "./collection";
import type { CheckIn } from "./model";

import type { Space } from "../space/model";

/**
 * Checks if current session user is allowed to check into space with req.params.place_id,
 * in other words, has session user checked in space already today?
 */
const isSessionUserNotCheckInToday = async(req: Request, res: Response, next: NextFunction) => {

    const todayCheckIn = await CheckInCollection.findOneToday(req.session.userId as string/*, req.params.place_id as string*/);
    if (todayCheckIn){
        res.status(403).json({
            message: `User with userId: ${req.session.userId} already checked in today. Check in time: ${todayCheckIn.date}`
        });
        return;
    }
    next();
}


/**
 * Group by userId and count number of check ins,
 * @returns Map< user._id => count>
 */
function countCheckInsByUser(checkIns: Array<HydratedDocument<CheckIn>>): Map<string, number>{
    const allUserIds: Array<string> = checkIns.map( i => i.user._id.toString())
    const initialSums: Map<string, number> = new Map();
    const finalSums = allUserIds.reduce(function(sums,entry){
        sums.set(entry, (sums.get(entry) || 0) + 1);
        return sums;
    }, initialSums);
    return finalSums;
}

/**
 * Handle refreshing Space details, such as the localLegend and total check-in counts upon new check-in request. 
 */
async function refreshSpaceLocalLegend(place_id: string): Promise<HydratedDocument<Space> | null>{
    const spaceCheckIns = await CheckInCollection.findAllBySpace(place_id as string);
    const totalCount = spaceCheckIns.length;
    const countedCheckIns = countCheckInsByUser(spaceCheckIns);
    const legendCount = [...countedCheckIns.entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
    const newSpace = await SpaceCollection.updateOne(place_id, totalCount, legendCount[0], legendCount[1]);
    return newSpace;
}   

export {
    isSessionUserNotCheckInToday,
    countCheckInsByUser,
    refreshSpaceLocalLegend
}