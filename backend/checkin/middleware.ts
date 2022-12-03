import SpaceCollection from "../space/collection";
import UserCollection from "../user/collection";
import type { Request, Response, NextFunction } from "express";
import { exists } from "fs";

import type { HydratedDocument } from "mongoose";

import CheckInCollection from "./collection";
import type { CheckIn } from "./model";

/**
 * Checks if current session user is allowed to check into space with req.params.place_id,
 * in other words, has session user checked in space already today?
 */
const isSessionUserNotCheckInToday = async(req: Request, res: Response, next: NextFunction) => {

    const todayCheckIn = await CheckInCollection.findOneToday(req.session.userId as string, req.params.place_id as string);
    if (todayCheckIn){
        res.status(403).json({
            message: `User with userId: ${req.session.userId} already checked into ${req.params.place_id} today. Today's date: ${todayCheckIn.date}`
        });
        return;
    }
    next();
}

export {
    isSessionUserNotCheckInToday,
}