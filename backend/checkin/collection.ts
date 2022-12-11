import type { HydratedDocument, Types } from "mongoose";
import type { CheckIn } from "./model";
import CheckInModel from "./model";

import {refreshSpaceLocalLegend} from "./middleware";

import { place_idTo_id } from "../space/middleware";
import { gapiIdTo_id } from "../user/middleware";

class CheckInCollection {

    /**
     * Add's a check in to collection, with corresponding count or count = 1, if 
     * first check in at location
     */
    static async addOne(userId: string, place_id: string): Promise<HydratedDocument<CheckIn>> {
        const mg_userId = await gapiIdTo_id(userId); //mongo user._id
        const mg_spaceId = await place_idTo_id(place_id) //mongo space._id
        //find yesterday's check in, if such exists; sorting by count and limit 1 is efficient because spark magic i guess?
        const yesterdayCheckIn = await CheckInModel.find({user: mg_userId, space: mg_spaceId}).sort({count:-1}).limit(1)
        const yestCount: number = yesterdayCheckIn.pop()?.count?? 0;

        const rightNow = new Date();
        const checkin = new CheckInModel({
            user: mg_userId,
            space: mg_spaceId,
            date: rightNow,
            count: yestCount + 1
        });
        await checkin.save();
        await refreshSpaceLocalLegend(place_id);
        return (await checkin.populate("user")).populate({path: "space", populate: {path: "localLegend"}});
    }


    static async findOneToday(userId: string): Promise<HydratedDocument<CheckIn> | null>{
        const rightNow = new Date();
        return CheckInModel.findOne({
            user: await gapiIdTo_id(userId),
            date: {$gte: rightNow.toDateString()} //query: {date in store is >= today's Date at 00:00}
        }).populate("user").populate({path: "space", populate: {path: "localLegend"}});
    }

    static async findAll(): Promise<Array<HydratedDocument<CheckIn>>>{
        return CheckInModel.find({}).populate("user").populate({path: "space", populate: {path: "localLegend"}});
    }

    static async findAllByUserSpace(userId: string | undefined, place_id: string | undefined): Promise<Array<HydratedDocument<CheckIn>>>{
        const mg_userId = await gapiIdTo_id(userId as string); //mongo user._id
        const mg_spaceId = await place_idTo_id(place_id as string) //mongo space._id
        
        if (place_id !== undefined && userId !== undefined){
            return CheckInModel.find({
                space: mg_spaceId,
                user: mg_userId
            }).populate("user").populate({path: "space", populate: {path: "localLegend"}});
        }
        else if (place_id !== undefined){
            return CheckInModel.find({space: mg_spaceId}).populate("user").populate({path: "space", populate: {path: "localLegend"}});
        }
        else{
            return CheckInModel.find({user: mg_userId}).populate("user").populate({path: "space", populate: {path: "localLegend"}});
        }
    }

    static async findAllBySpace(place_id: string): Promise<Array<HydratedDocument<CheckIn>>>{
        const mg_spaceId = await place_idTo_id(place_id as string) //mongo space._id
        return CheckInModel.find({space: mg_spaceId}).populate("user").populate({path: "space", populate: {path: "localLegend"}});
    }



}
export default CheckInCollection;