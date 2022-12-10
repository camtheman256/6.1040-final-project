import type { HydratedDocument, Types } from "mongoose";
import type { PlaceRequest } from "./model";
import PlaceRequestModel from "./model";
import * as checkInMiddleware from "../checkin/middleware"

import CheckInCollection from "../checkin/collection";

class PlaceRequestCollection {
    static async addOne(author: string, space: string, title: string, textContent: string,
                        /*dateCreated: Date, tags: Array<string>, */ anonymous: boolean, /*upvotingUsers: Array<string>,*/
                        /*resolved: boolean,*/ /*inProcess: boolean*/): Promise<HydratedDocument<PlaceRequest>> {
        const date = new Date();
        const userArray: Array<string> = []
        const request = new PlaceRequestModel({
            author,
            space,
            title,
            textContent, 
            dateCreated: date,
            //tags, 
            anonymous,
            upvotingUsers: userArray,
            resolved: false,
            //inProcess: false
        });
        await request.save();
        return request;
    }

    static async findByAuthorSpace(place_id: string | undefined, userId: string | undefined): Promise<Array<HydratedDocument<PlaceRequest>>>{
        if (place_id !== undefined && userId !== undefined){
            return PlaceRequestModel.find({
                space: place_id,
                author: userId
            }).populate("author").populate("space");
        }
        else if (place_id !== undefined){
            return PlaceRequestModel.find({space: place_id}).sort({dateCreated: -1})
            .populate("author").populate("space");
        }
        else{
            return PlaceRequestModel.find({author: userId}).sort({dateCreated: -1})
            .populate("author").populate("space");
        }
    }

    static async findAll(): Promise<Array<HydratedDocument<PlaceRequest>>>{
        return PlaceRequestModel.find({}).populate("author").populate("space");;
    }

    static async findOneById(requestId: string): Promise<HydratedDocument<PlaceRequest> | null>{
        return PlaceRequestModel.findOne({_id: requestId as string}).populate("author").populate("space");;
    }

    static async deleteOne(requestId: string): Promise<void>{
        PlaceRequestModel.deleteOne({_id: requestId});
    }

    static async findRankedBySpace(place_id: string): Promise<Array<HydratedDocument<PlaceRequest>>>{
        const allRequests = await this.findByAuthorSpace(place_id, undefined);
        const checkIns = await CheckInCollection.findAllBySpace(place_id);
        const userCheckInCounts: Map<string, number> = checkInMiddleware.countCheckInsByUser(checkIns);
        const userIdsRanked: Array<string> = [...userCheckInCounts.entries()].sort((a, b) => b[1] - a[1]).map( i => i[0] ); //sort userCheckInCounts by count, return only userIds
        function compareReq(n1: HydratedDocument<PlaceRequest>, n2: HydratedDocument<PlaceRequest>){
            if (userIdsRanked.indexOf(n1.author?? "" ) > userIdsRanked.indexOf(n2.author?? "")){
                return 1;
            }
            if (userIdsRanked.indexOf(n1.author?? "") < userIdsRanked.indexOf(n2.author?? "")){
                return -1;
            }
            return 0;
        }
        allRequests.sort(compareReq);
        return allRequests;
    }

    
}
export default PlaceRequestCollection;