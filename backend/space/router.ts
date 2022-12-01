import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import express from "express";

import SpaceCollection from "./collection";
import { constructSpaceResponse } from "./util";

import * as userMiddleware from "../user/middleware"
import * as spaceMiddleware from "./middleware"


const router = express.Router();

/**
 * @name POST /api/spaces
 */
router.post(
    "/",
    [
        userMiddleware.isUserLoggedIn,
        spaceMiddleware.isValidPlaceResponse,
        spaceMiddleware.isPlaceAlreadyExists
    ],
    async (req: Request, res: Response) => {
        const placePayload: google.maps.places.PlaceResult = req.body;
        const space = await SpaceCollection.addOne(placePayload);
        res.status(201).json({
            message: "Space was successfully created.",
            space: constructSpaceResponse(space)
        });
    }
);

/**
 * @name DELETE /api/spaces/{place_id}
 */
router.delete(
    "/{place_id}",
    [
        userMiddleware.isUserLoggedIn,
        spaceMiddleware.isPlaceExists
    ],
    async (req: Request, res: Response) => {
        const place_id: string = req.params.place_id;
        await SpaceCollection.deleteOne(place_id);
        res.status(200).json({
            message: "Space was successfully deleted."
        })
    }
)

/**
 * @name GET /api/spaces/{place_id}
 */
router.get(
    "/{place_id}",
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.params.place_id !== undefined){
            next();
            return;
        }
        const allSpaces = await SpaceCollection.findAll();
        const allSpacesResponse = allSpaces.map(constructSpaceResponse);
        res.status(200).json({
            spaces: allSpacesResponse //[TODO] think about spaces vs. space... do we want to split this path into two?
        })
    },
    [
        spaceMiddleware.isPlaceExists
    ],
    async (req: Request, res: Response) => {
        const place_id: string = req.params.place_id;
        const space = await SpaceCollection.findOne(place_id);
        if (!space) {
            res.status(404).json({
                message: `Space with place_id: ${place_id} does not exist.`
            });
        } else{
            res.status(200).json({
                space: constructSpaceResponse(space)
            });
        }
    }
);

/**
 * @name PUT /api/spaces/{spaceId}
 */

// TODO

export { router as spaceRouter };