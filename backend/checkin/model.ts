import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export type CheckIn = {
    _id: Types.ObjectId; //mongoDB

    /** corresponds to google Auth's userId token */
    user: string;

    /** corresponds to placeId of space */
    space: string;

    date: Date;

    

    /** Count of all checkins by this user at this space, including this one. */
    count: number;
}

const CheckInSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    space: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
});

const CheckInModel = model<CheckIn>("CheckIn", CheckInSchema);
export default CheckInModel;