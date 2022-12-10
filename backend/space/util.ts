import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { Space } from "./model";

export type SpaceResponse = {
  _id: string;
  place_id: string,
  formatted_address: string,
  formatted_phone_number: string,
  name: string,

  /** see https://developers.google.com/maps/documentation/places/web-service/details#PlacePhoto */
  photos?: any

  /** ref to google's official place embed */
  url: string,

  /** place's external website */
  website: string

  latlng?: any
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

const constructSpaceResponseFromObject = (space: Space): SpaceResponse => {
  return {
    _id: space._id.toString(),
    place_id: space.place_id as string,
    formatted_address: space.formatted_address as string,
    formatted_phone_number: space.formatted_phone_number as string,
    name: space.name as string,
    photos: 
  }
}

export { constructSpaceResponse };
