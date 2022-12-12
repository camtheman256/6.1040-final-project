import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { PlaceRequest, PopulatedPlaceRequest } from "./model";

import { type UserResponse, constructUserResponse, constructUserResponseFromObject } from "../user/util";
import { type SpaceResponse, constructSpaceResponse, constructSpaceResponseFromObject } from "../space/util";

export type PlaceRequestResponse = {
  _id: string; //mongoDB
  author: UserResponse;
  space: SpaceResponse;
  title: string;
  textContent: string;
  dateCreated: string;
  anonymous: boolean;
  upvotingUsers: Array<UserResponse>;
  resolved: boolean;
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
    space: constructSpaceResponseFromObject(placeRequestCopy.space),
    _id: placeRequestCopy._id.toString(),
    dateCreated: formatDate(placeRequestCopy.dateCreated),
    textContent: placeRequestCopy.textContent,
    anonymous: placeRequestCopy.anonymous,
    resolved: placeRequestCopy.resolved,
    title: placeRequestCopy.title,
    upvotingUsers: placeRequestCopy.upvotingUsers.map(constructUserResponseFromObject)
  };
};

export { constructPlaceRequestResponse };
