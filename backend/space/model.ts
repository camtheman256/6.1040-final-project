import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export type Space = {
  _id: Types.ObjectId; //mongoDB
  place_id: string,
  formatted_address: string,
  formatted_phone_number: string,
  name: string,
  photos: Array<string> //see https://developers.google.com/maps/documentation/places/web-service/details#PlacePhoto
  url: string, //ref to google's official place embed
  website: string //place's external website

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
    required: true
  },
  photos: {
    type: Array<String>,
    required: false
  },
  url: {
    type: String,
    required: false
  },
  website: {
    type: String,
    required: false
  }
});

const SpaceModel = model<Space>("Space", SpaceSchema);
export default SpaceModel;
