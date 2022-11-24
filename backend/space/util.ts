import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { Space } from "./model";

type SpaceResponse = {
  _id: string;
  place_id: string,
  formatted_address: string,
  formatted_phone_number: string,
  name: string,
  photos: Array<string> //see https://developers.google.com/maps/documentation/places/web-service/details#PlacePhoto
  url: string, //ref to google's official place embed
  website: string //place's external website
};

/**
 * @param {HydratedDocument<Space>} 
 * @returns {SpaceResponse} 
 */
const constructSpaceResponse = (space: HydratedDocument<Space>): SpaceResponse => {
  const spaceCopy: Space = {
    ...space.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };
  return {
    ...spaceCopy,
    _id: spaceCopy._id.toString()
  };
};

export { constructSpaceResponse };
