import type { Types } from "mongoose";
import { Schema, model } from "mongoose";




export type Space = {
  _id: Types.ObjectId; //mongoDB
  place_id: string;
  formatted_address: string;
  formatted_phone_number: string;
  name: string;

  /** see https://developers.google.com/maps/documentation/places/web-service/details#PlacePhoto */
  photos?: google.maps.places.PlacePhoto[];
  /** ref to google's official place embed */
  url: string;
  /** place's external website */
  website: string;

  /** LatLong object of space defined by google maps api */
  latlng?: google.maps.LatLngLiteral;
  
};

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
    required: false
  },
});

const SpaceModel = model<Space>("Space", SpaceSchema);
export default SpaceModel;
