import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { PlaceRequest, PopulatedPlaceRequest } from "./model";

import { type UserResponse, constructUserResponse, constructUserResponseFromObject } from "../user/util";
import { type SpaceResponse, constructSpaceResponse } from "../space/util";

export type PlaceRequestResponse = {
  _id: string; //mongoDB

  author: UserResponse;
  /** corresponds to google Auth's userId token */

  space: SpaceResponse;
  /** corresponds to placeId of space */

  title: string;
  textContent: string; //markdown?

  dateCreated: string;

  //tags: Array<string>;
  /** [TENATIVE] tagIds associated with request */

  anonymous: boolean;

  upvotingUsers: Array<UserResponse>;
  /** gapi userIds of upvoting users */

  resolved: boolean;

  //inProcess: boolean;
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
  const placeRequestCopy: PopulatedPlaceRequest = {
    ...placeRequest.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };

  return {
    author: constructUserResponseFromObject(placeRequestCopy.author),
    space: constructSpaceResponse(placeRequestCopy.space),
    _id: placeRequestCopy._id.toString(),
    dateCreated: formatDate(placeRequest.dateCreated),
    textContent: placeRequestCopy.textContent,
    anonymous: placeRequestCopy.anonymous,
    resolved: placeRequestCopy.resolved,
    title: placeRequestCopy.title,
    upvotingUsers: placeRequestCopy.upvotingUsers.map(constructUserResponseFromObject)
  };
};

export { constructPlaceRequestResponse };
