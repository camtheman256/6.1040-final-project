import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { User } from "./model";

export type UserResponse = {
  //_id: string;
  gapiUserId: string;
  name: string;
  imageUrl: string;
  email: string;
  dateJoined: string;
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
 * Transform a raw User object from the database into an object
 * with all the information needed by the frontend
 * (in this case, removing the password for security)
 *
 * @param {HydratedDocument<User>} user - A user object
 * @returns {UserResponse} - The user object without the password
 */
const constructUserResponse = (user: HydratedDocument<User>): UserResponse => {
  const userCopy: User = {
    ...user.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };
  return {
    ...userCopy,
    //_id: userCopy._id.toString(),
    dateJoined: formatDate(user.dateJoined),
  };
};

const constructUserResponseFromObject = (user: User): UserResponse => {
  return {
    dateJoined: formatDate(user.dateJoined),
    gapiUserId: user.gapiUserId as string,
    name: user.name as string,
    imageUrl: user.imageUrl as string,
    email: user.email as string
  }
}

export { constructUserResponse,
  constructUserResponseFromObject };
