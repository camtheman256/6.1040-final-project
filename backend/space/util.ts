import type { HydratedDocument } from "mongoose";
import moment from "moment";
import type { Space, PopulatedSpace } from "./model";
import { type UserResponse, constructUserResponse, constructUserResponseFromObject } from "../user/util";

export type SpaceResponse = {
  _id: string;
  place_id: string;
  formatted_address: string;
  formatted_phone_number: string;
  name: string;

  /** see https://developers.google.com/maps/documentation/places/web-service/details#PlacePhoto */
  photos?: string[];

  /** ref to google's official place embed */
  url: string;

  /** place's external website */
  website: string;

  latlng?: any;

  localLegend?: UserResponse;

  localLegendCount?: number;

  totalCheckInCount: number;
};

/**
 * @param {HydratedDocument<Space>}
 * @returns {SpaceResponse}
 */
const constructSpaceResponse = (
  space: HydratedDocument<Space>
): SpaceResponse => {
  const spaceCopy: PopulatedSpace = {
    ...space.toObject({
      versionKey: false, // Cosmetics; prevents returning of __v property
    }),
  };

  return {
    _id: spaceCopy._id.toString(),
    place_id: spaceCopy.place_id as string,
    formatted_address: spaceCopy.formatted_address as string,
    formatted_phone_number: spaceCopy.formatted_phone_number as string,
    name: spaceCopy.name as string,
    photos: spaceCopy.photos,
    url: spaceCopy.url,
    website: spaceCopy.website,
    latlng: spaceCopy.latlng,
    localLegend: spaceCopy.localLegend? constructUserResponseFromObject(spaceCopy.localLegend) : undefined,
    localLegendCount: spaceCopy.localLegendCount,
    totalCheckInCount: spaceCopy.totalCheckInCount
  };
};

const constructSpaceResponseFromObject = (space: PopulatedSpace): SpaceResponse => {
  return {
    _id: space._id.toString(),
    place_id: space.place_id as string,
    formatted_address: space.formatted_address as string,
    formatted_phone_number: space.formatted_phone_number as string,
    name: space.name as string,
    photos: space.photos,
    url: space.url,
    website: space.website,
    latlng: space.latlng,
    localLegend: space.localLegend? constructUserResponseFromObject(space.localLegend) : undefined,
    localLegendCount: space.localLegendCount,
    totalCheckInCount: space.totalCheckInCount
  }
}

export { constructSpaceResponse,
  constructSpaceResponseFromObject };
