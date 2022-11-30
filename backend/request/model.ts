import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export type PlaceRequest = {
    _id: Types.ObjectId; //mongoDB
    author: string;
    /** corresponds to google Auth's userId token */

    space: string;
    /** corresponds to placeId of space */

    title: string;
    textContent: string; //markdown?

    dateCreated: Date;

    tags: Array<string>; 
    /** [TENATIVE] tagIds associated with request */

    anonymous: boolean;

    upvotingUsers: Array<string>;
    /** gapi userIds of upvoting users */

    resolved: boolean;

    inProcess: boolean;
}

const PlaceRequestSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    space: {
        type: String,
        required: true
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
    tags: {
        type: Array<String>,
        required: true
    },
    anonymous: {
        type: Boolean,
        required: true
    },
    upvotingUsers: {
        type: Array<String>,
        required: true
    },
    resolved: {
        type: Boolean,
        required: true
    },
    inProcess: {
        type: Boolean,
        required: true
    }
});

const PlaceRequestModel = model<PlaceRequest>("PlaceRequest", PlaceRequestSchema);
export default PlaceRequestModel;