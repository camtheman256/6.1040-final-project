import type { HydratedDocument, Types } from "mongoose";
import type { PlaceRequest } from "./model";
import PlaceRequestModel from "./model";

class PlaceRequestCollection {
    static async addOne(author: string, space: string, title: string, textContent: string,
                        dateCreated: Date, tags: Array<string>, anonymous: boolean, upvotingUsers: Array<string>,
                        resolved: boolean, inProcess: boolean): Promise<HydratedDocument<PlaceRequest>> {
        
        const request = new PlaceRequestModel({
            author,
            space,
            title,
            textContent, 
            dateCreated,
            tags, 
            anonymous,
            upvotingUsers,
            resolved,
            inProcess
        });
        await request.save();
        return request;
    }

    static async findByAuthorSpace(place_id: string | undefined, userId: string | undefined): Promise<Array<HydratedDocument<PlaceRequest>>>{
        if (place_id !== undefined && userId !== undefined){
            return PlaceRequestModel.find({
                space: place_id,
                author: userId
            });
        }
        else if (place_id !== undefined){
            return PlaceRequestModel.find({space: place_id});
        }
        else{
            return PlaceRequestModel.find({author: userId});
        }
    }

    static async findAll(): Promise<Array<HydratedDocument<PlaceRequest>>>{
        return PlaceRequestModel.find({});
    }

    static async findOneById(requestId: string): Promise<HydratedDocument<PlaceRequest> | null>{
        return PlaceRequestModel.findOne({_id: requestId as string});
    }

    static async deleteOne(requestId: string): Promise<void>{
        PlaceRequestModel.deleteOne({_id: requestId});
    }


    
}
export default PlaceRequestCollection;