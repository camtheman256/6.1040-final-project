import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

import type { User } from "../user/model"

export type Space = {
  _id: Types.ObjectId; //mongoDB
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

  /** LatLong object of space defined by google maps api */
  latlng?: google.maps.LatLngLiteral;

  /** User with the most amount of check-ins for this Space */
  localLegend?: Types.ObjectId;

  /** Check-in count for the local legend */
  localLegendCount?: number;

  /** Total number of check-ins to this space of all time.*/
  totalCheckInCount: number;
};

export type PopulatedSpace = {
  _id: Types.ObjectId; //mongoDB
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

  /** LatLong object of space defined by google maps api */
  latlng?: google.maps.LatLngLiteral;

  /** User with the most amount of check-ins for this Space */
  localLegend?: User;

  /** Check-in count for the local legend */
  localLegendCount?: number;

  /** Total number of check-ins to this space of all time.*/
  totalCheckInCount: number;
}
const SpaceSchema = new Schema({
  place_id: {
    type: String,
    required: true,
  },
  formatted_address: {
    type: String,
    required: true,
  },
  formatted_phone_number: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  photos: {
    type: Array,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  latlng: {
    lat: Number,
    lng: Number,
  },

  localLegend: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "User"
  },

  localLegendCount: {
    type: Number,
    required: false
  },

  totalCheckInCount: {
    type: Number,
    required: true
  }

});

const SpaceModel = model<Space>("Space", SpaceSchema);
export default SpaceModel;
