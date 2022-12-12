import type { HydratedDocument } from "mongoose";
import type { CheckIn, PopulatedCheckIn } from "./model";
import type { User } from "../user/model";
import {
  type UserResponse,
  constructUserResponseFromObject,
} from "../user/util";
import {
  type SpaceResponse,
  constructSpaceResponseFromObject,
} from "../space/util";

export type CheckInResponse = {
  _id: string; //mongoDB

  user: UserResponse;

  space: SpaceResponse;

  date: string;

  /** this CheckIn is the count^th check-in for this user, at this space. */
  count: number;
};

export type CheckInCountsResponse = {
  user: UserResponse;
  count: number;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => date.toISOString();

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
    count: checkinCopy.count,
  };
};

const constructCountsResponse = (countObject: {
  user: HydratedDocument<User>;
  count: number;
}): CheckInCountsResponse => {
  const user: User = countObject.user;
  return {
    user: constructUserResponseFromObject(user),
    count: countObject.count,
  };
};

export { constructCheckInResponse, constructCountsResponse };
