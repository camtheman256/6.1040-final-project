import type { Types } from "mongoose";
import { Schema, model } from "mongoose";

export type Space = {
  _id: Types.ObjectId; //mongoDB
  place_id: String,
  formatted_address: String,
  formatted_phone_number: String,
  name: String,
  photos: Array<String> //see https://developers.google.com/maps/documentation/places/web-service/details#PlacePhoto
  url: String, //ref to google's official place embed
  website: String //place's external website

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
    type: String,
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
