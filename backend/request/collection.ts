import type { HydratedDocument, Types } from "mongoose";
import type { PlaceRequest, PopulatedPlaceRequest } from "./model";
import PlaceRequestModel from "./model";
import * as checkInMiddleware from "../checkin/middleware"

import CheckInCollection from "../checkin/collection";
import { place_idTo_id } from "../space/middleware";
import { gapiIdTo_id } from "../user/middleware";

class PlaceRequestCollection {
    static async addOne(author: string, space: string, title: string, textContent: string, anonymous: boolean): Promise<HydratedDocument<PlaceRequest>> {
        const date = new Date();
        const userArray: Array<string> = []
        const request = new PlaceRequestModel({
            author,
            space,
            title,
            textContent, 
            dateCreated: date,
            anonymous,
            upvotingUsers: userArray,
            resolved: false,
        });
        await request.save();
        return (await (await request.populate("author")).populate({path: "space", populate: {path: "localLegend"}})).populate("upvotingUsers");
    }

    static async findByAuthorSpace(place_id: string | undefined, userId: string | undefined): Promise<Array<HydratedDocument<PlaceRequest>>>{
        if (place_id !== undefined && userId !== undefined){
            return PlaceRequestModel.find({
                space: await place_idTo_id(place_id),
                author: await gapiIdTo_id(userId)
            }).populate("author").populate({path: "space", populate: {path: "localLegend"}}).populate("upvotingUsers");
        }
        else if (place_id !== undefined){
            return PlaceRequestModel.find({space: await place_idTo_id(place_id)}).sort({dateCreated: -1})
            .populate("author").populate({path: "space", populate: {path: "localLegend"}}).populate("upvotingUsers");
        }
        else{
            return PlaceRequestModel.find({author: await gapiIdTo_id(userId as string)}).sort({dateCreated: -1})
            .populate("author").populate({path: "space", populate: {path: "localLegend"}}).populate("upvotingUsers");
        }
    }

    static async findAll(): Promise<Array<HydratedDocument<PlaceRequest>>>{
        return PlaceRequestModel.find({}).populate("author").populate({path: "space", populate: {path: "localLegend"}}).populate("upvotingUsers");
    }

    static async findOneById(requestId: string): Promise<HydratedDocument<PlaceRequest> | null>{
        return PlaceRequestModel.findOne({_id: requestId as string}).populate("author").populate({path: "space", populate: {path: "localLegend"}}).populate("upvotingUsers");
    }

    static async deleteOne(requestId: string): Promise<void>{
        PlaceRequestModel.deleteOne({_id: requestId});
    }

    static async findRankedBySpace(place_id: string): Promise<Array<HydratedDocument<PlaceRequest>>>{
        const allRequests: Array<HydratedDocument<PlaceRequest>> = await this.findByAuthorSpace(place_id, undefined);
        const checkIns = await CheckInCollection.findAllBySpace(place_id);
        const userCheckInCounts: Map<string, number> = checkInMiddleware.countCheckInsByUser(checkIns);
        const userIdsRanked: Array<string> = [...userCheckInCounts.entries()].sort((a, b) => b[1] - a[1]).map( i => i[0] ); //sort userCheckInCounts by count, return only userIds
        function compareReq(n1: HydratedDocument<PlaceRequest>, n2: HydratedDocument<PlaceRequest>){
            const req1: PopulatedPlaceRequest = {...n1.toObject({versionKey: false})};
            const req2: PopulatedPlaceRequest = {...n2.toObject({versionKey: false})};
            if (userIdsRanked.indexOf(req1.author.gapiUserId?? "" ) > userIdsRanked.indexOf(req2.author.gapiUserId?? "")){
                return 1;
            }
            if (userIdsRanked.indexOf(req1.author.gapiUserId?? "") < userIdsRanked.indexOf(req2.author.gapiUserId?? "")){
                return -1;
            }
            return 0;
        }
        allRequests.sort(compareReq);
        return allRequests;
    }

    static async updateOne(requestId: string, resolved: boolean): Promise<HydratedDocument<PlaceRequest> | null>{
        const request = await PlaceRequestModel.findOne({_id: requestId});
        if (request){
            request.resolved = resolved;
            await request.save();
            return (await (await request.populate("author")).populate({path: "space", populate: {path: "localLegend"}})).populate("upvotingUsers");
        }
        return null; //I know i'm sorry again
    }

    
}
export default PlaceRequestCollection;