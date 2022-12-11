import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { Reply } from "./model";

type ReplyResponse = {
  _id: string; //mongoDB
  author: string;
  /** corresponds to google Auth's userId token */

  request: string;
  /** corresponds to requestId of request */

  textContent: string;

  dateCreated: string;

  anonymous: boolean;

  upvotingUsers: Array<string>;
  /** gapi userIds of upvoting users */
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string =>
  date.toISOString();

/**
 * @param {HydratedDocument<Reply>}
 * @returns {ReplyResponse}
 */
const constructReplyResponse = (
  reply: HydratedDocument<Reply>
): ReplyResponse => {
  const replyCopy: Reply = {
    ...reply.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };
  return {
    ...replyCopy,
    _id: replyCopy._id.toString(),
    dateCreated: formatDate(replyCopy.dateCreated),
  };
};

export { constructReplyResponse };
