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
  latlng?: google.maps.LatLng;

  
  /** requestIds of all requests associated with this space */
  //requests: Array<string>;
  
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
    type: Array<google.maps.places.PlacePhoto>,
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
  
  //backend/space/model.ts -> SpaceSchema.latlng
  latlng: {
    type: google.maps.LatLng,
    required: false
  },
  /*
  requests: {
    type: Array<String>,
    required: true
  }
  */
});

const SpaceModel = model<Space>("Space", SpaceSchema);
export default SpaceModel;
