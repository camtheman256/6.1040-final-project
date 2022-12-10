import type { User } from "../user/model";
import type { Types } from "mongoose";
import { Schema, model } from "mongoose";
import type { Space } from "../space/model";

export type CheckIn = {
    _id: Types.ObjectId; //mongoDB
    user: Types.ObjectId;
    space: Types.ObjectId;
    date: Date;
    /** this CheckIn is the count^th check-in for this user, at this space. */
    count: number;
}

export type PopulatedCheckIn = {
    _id: Types.ObjectId;
    user: User;
    space: Space;
    date: Date;
    count: number;
}

const CheckInSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    space: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Space"
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