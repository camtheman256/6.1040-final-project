import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { CheckIn } from "./model";

type CheckInResponse = {
    _id: string; //mongoDB
    user: string;
    /** corresponds to google Auth's userId token */

    space: string;
    /** corresponds to placeId of space */

    date: string;

    count: number;
    /** Count of all checkins by this user at this space, including this one. */
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
 const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

 /**
 * @param {HydratedDocument<CheckIn>} 
 * @returns {CheckInResponse} 
 */
const constructCheckInResponse = (checkin: HydratedDocument<CheckIn>): CheckInResponse => {
    const checkinCopy: CheckIn = {
      ...checkin.toObject({
        versionKey: false, // Cosmetics; prevents returning of __v property
      }),
    };
    return {
      ...checkinCopy,
      _id: checkinCopy._id.toString(),
      date: formatDate(checkinCopy.date)
    };
  };
  
  export { constructCheckInResponse };