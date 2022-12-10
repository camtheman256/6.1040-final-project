import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { CheckIn, PopulatedCheckIn } from "./model";

import { type UserResponse, constructUserResponse, constructUserResponseFromObject } from "../user/util";
import { type SpaceResponse, constructSpaceResponse, constructSpaceResponseFromObject } from "../space/util";

export type CheckInResponse = {
  _id: string; //mongoDB

  user: UserResponse;

  space: SpaceResponse;

  date: string;

  /** this CheckIn is the count^th check-in for this user, at this space. */
  count: number;
};

type CheckInCountsResponse = {
  user: UserResponse;
  count: number;
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
 * @param {HydratedDocument<CheckIn>}
 * @returns {CheckInResponse}
 */
const constructCheckInResponse = (
  checkin: HydratedDocument<CheckIn>
): CheckInResponse => {
  const checkinCopy: PopulatedCheckIn = {
    ...checkin.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };
  return {
    _id: checkinCopy._id.toString(),
    date: formatDate(checkinCopy.date),
    user: constructUserResponseFromObject(checkinCopy.user),
    space: constructSpaceResponseFromObject(checkinCopy.space),
    count: checkinCopy.count
  };
};

export { constructCheckInResponse };
