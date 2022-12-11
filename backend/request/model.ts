import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

import type { User } from "../user/model"
import type { Space, PopulatedSpace } from "../space/model"

export type PlaceRequest = {
    _id: Types.ObjectId; //mongoDB

    author: Types.ObjectId;
    //author: string;
    /** corresponds to google Auth's userId token */

    space: Types.ObjectId;
    //space: string;
    /** corresponds to placeId of space */

    title: string;
    textContent: string; //markdown?

    dateCreated: Date;

    //tags: Array<string>; 
    /** [TENATIVE] tagIds associated with request */

    anonymous: boolean;

    upvotingUsers: Array<Types.ObjectId>;

    resolved: boolean;

    //inProcess: boolean;
}

export type PopulatedPlaceRequest = {
    _id: Types.ObjectId; //mongoDB

    author: User;

    space: PopulatedSpace;

    title: string;
    textContent: string; //markdown?

    dateCreated: Date;

    anonymous: boolean;

    upvotingUsers: Array<User>;

    resolved: boolean;
}

const PlaceRequestSchema = new Schema({
    /*
    author: {
        type: String,
        required: true,
        ref: "User"
    },
    */
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    /*
    space: {
        type: String,
        required: true,
        ref: "Space"
    },
    */
   space: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Space"
   },
    title: {
        type: String,
        required: true
    },
    textContent: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    },
    /*
    tags: {
        type: Array<String>,
        required: true
    },
    */
    anonymous: {
        type: Boolean,
        required: true
    },
    upvotingUsers: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }],
    resolved: {
        type: Boolean,
        required: true
    },
    /*
    inProcess: {
        type: Boolean,
        required: true
    }
    */
});

const PlaceRequestModel = model<PlaceRequest>("PlaceRequest", PlaceRequestSchema);
export default PlaceRequestModel;