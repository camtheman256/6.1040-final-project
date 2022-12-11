import type { Request, Response, NextFunction } from "express";
import { exists } from "fs";

import type { HydratedDocument } from "mongoose";

import SpaceCollection from "./collection";
import type { Space } from "./model";

/**
 * Checks if place details payload has all the required information in req.body
 */
const isValidPlaceResponse = async (req: Request, res: Response, next: NextFunction) => {
    const placePayload: google.maps.places.PlaceResult = req.body;
    if (!placePayload.place_id || 
        !placePayload.formatted_address || 
        !placePayload.name){
        res.status(400).json({
            message: "Provided place details do not have one of [place_id, formatted_address, name]"
        });
        return;
    }
    next();
}

/**
 * Checks if place in req.body already exists in collections
 */
const isPlaceAlreadyExists = async (req: Request, res: Response, next: NextFunction) => {
    const placePayload: google.maps.places.PlaceResult = req.body;
    const place_id: string = placePayload.place_id?? ""; //should always be place_id because we check for valid response
    const space = await SpaceCollection.findOne(place_id);
    if (space) {
      res.status(403).json({
        message: `Space with place_id: ${place_id} already exists.`
      });
      return;
    }
    next();
};

/**
 * Checks if place_id in req.params exists
 */
const isPlaceExists = async (req: Request, res: Response, next: NextFunction) => {
    const place_id: string = req.query.place_id as string
    const space = await SpaceCollection.findOne(place_id);
    if (!space) {
      res.status(404).json({
        message: `Space with place_id: ${place_id} does not exist.`
      });
      return;
    }
    next();
};

/**
 * Checks if place_id in req.params exists
 */
 const isPlaceExistsDelete = async (req: Request, res: Response, next: NextFunction) => {
  const place_id: string = req.params.place_id;
  const space = await SpaceCollection.findOne(place_id);
  if (!space) {
    res.status(404).json({
      message: `Space with place_id: ${place_id} does not exist.`
    });
    return;
  }
  next();
};

/**
 * Checks if place_id in req.query exists; move on if req.query not provided
 */
const isPlaceQueryExists = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.space && !req.query.place_id){
    next();
    return;
  }
  const place_id = req.query.space?? req.query.place_id;
  const space = await SpaceCollection.findOne(place_id as string);
  if (!space) {
    res.status(404).json({
      message: `Space with place_id: ${place_id} does not exist.`
    });
    return;
  }
  next();
};




export {
    isValidPlaceResponse,
    isPlaceExistsDelete,
    isPlaceAlreadyExists,
    isPlaceExists,
    isPlaceQueryExists
}