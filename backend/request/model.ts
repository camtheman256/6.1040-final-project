import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

import type { User } from "../user/model"
import type { Space, PopulatedSpace } from "../space/model"

export type PlaceRequest = {
    _id: Types.ObjectId; //mongoDB

    author: Types.ObjectId;

    space: Types.ObjectId;

    title: string;

    /** content for PlaceRequest in markdown text format*/
    textContent: string;

    dateCreated: Date;

    anonymous: boolean;

    /** All users upvoting this PlaceRequest */
    upvotingUsers: Array<Types.ObjectId>;

    resolved: boolean;

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
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
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
});

const PlaceRequestModel = model<PlaceRequest>("PlaceRequest", PlaceRequestSchema);
export default PlaceRequestModel;