import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export type Reply = {
  _id: Types.ObjectId; //mongoDB
  author: string;
  /** corresponds to google Auth's userId token */

  request: string;
  /** corresponds to requestId of request */

  textContent: string;

  dateCreated: Date;

  anonymous: boolean;

  upvotingUsers: Array<string>;
  /** gapi userIds of upvoting users */
};

const ReplySchema = new Schema({
  author: {
    type: String,
    required: true,
  },
  request: {
    type: String,
    required: true,
  },
  textContent: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  anonymous: {
    type: Boolean,
    required: true,
  },
  upvotingUsers: {
    type: Array<String>,
    required: true,
  },
});

const ReplyModel = model<Reply>("Reply", ReplySchema);
export default ReplyModel;
