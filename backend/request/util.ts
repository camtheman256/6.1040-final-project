import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { PlaceRequest } from "./model";

export type PlaceRequestResponse = {
  _id: string; //mongoDB
  author: string;
  /** corresponds to google Auth's userId token */

  space: string;
  /** corresponds to placeId of space */

  title: string;
  textContent: string; //markdown?

  dateCreated: string;

  tags: Array<string>;
  /** [TENATIVE] tagIds associated with request */

  anonymous: boolean;

  upvotingUsers: Array<string>;
  /** gapi userIds of upvoting users */

  resolved: boolean;

  inProcess: boolean;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string =>
  moment(date).format("MMMM Do YYYY, h:mm:ss a");

/**
 * @param {HydratedDocument<PlaceRequest>}
 * @returns {PlaceRequestResponse}
 */
const constructPlaceRequestResponse = (
  placeRequest: HydratedDocument<PlaceRequest>
): PlaceRequestResponse => {
  const placeRequestCopy: PlaceRequest = {
    ...placeRequest.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };
  return {
    ...placeRequestCopy,
    _id: placeRequestCopy._id.toString(),
    dateCreated: formatDate(placeRequest.dateCreated),
  };
};

export { constructPlaceRequestResponse };
