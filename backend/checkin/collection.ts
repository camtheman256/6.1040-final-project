import type { HydratedDocument, Types } from "mongoose";
import type { CheckIn } from "./model";
import CheckInModel from "./model";

class CheckInCollection {

    /**
     * Add's a check in to collection, with corresponding count or count = 1, if 
     * first check in at location
     */
    static async addOne(userId: string, spaceId: string): Promise<HydratedDocument<CheckIn>> {
        //find yesterday's check in, if such exists; sorting by count and limit 1 is efficient because spark magic i guess?
        const yesterdayCheckIn = await CheckInModel.find({}).sort({count:-1}).limit(1)
        const yestCount: number = yesterdayCheckIn.pop()?.count?? 0;

        const rightNow = new Date();
        const checkin = new CheckInModel({
            user: userId,
            space: spaceId,
            date: rightNow,
            count: yestCount + 1
        });
        await checkin.save()
        return checkin
    }


    static async findOneToday(userId: string, /*spaceId: string*/): Promise<HydratedDocument<CheckIn> | null>{
        const rightNow = new Date();
        return CheckInModel.findOne({
            user: userId,
            //space: spaceId,
            date: {$gte: rightNow.toDateString()} //query: {date in store is >= today's Date at 00:00}
        });
    }

    static async findAll(): Promise<Array<HydratedDocument<CheckIn>>>{
        return CheckInModel.find({});
    }

    static async findAllByUserSpace(userId: string | undefined, spaceId: string | undefined): Promise<Array<HydratedDocument<CheckIn>>>{
        if (spaceId !== undefined && userId !== undefined){
            return CheckInModel.find({
                space: spaceId,
                user: userId
            });
        }
        else if (spaceId !== undefined){
            return CheckInModel.find({space: spaceId});
        }
        else{
            return CheckInModel.find({user: userId});
        }
    }

    static async findAllBySpace(spaceId: string): Promise<Array<HydratedDocument<CheckIn>>>{
        return CheckInModel.find({space: spaceId});
    }



}
export default CheckInCollection;