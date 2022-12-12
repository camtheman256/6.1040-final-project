import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import express from "express";

import PlaceRequestCollection from "./collection";
import SpaceCollection from "../space/collection";
import UserCollection from "../user/collection";

import { constructPlaceRequestResponse } from "./util";

import * as userMiddleware from "../user/middleware"
import * as spaceMiddleware from "../space/middleware"
import * as placeRequestMiddleware from "./middleware"

const router = express.Router();

/**
 * @name GET /api/requests?space=placeId&user=userId
 */
router.get(
    "/",
    [
        spaceMiddleware.isPlaceQueryExists,
        userMiddleware.isUserQueryExists
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.query.space !== undefined || req.query.user !== undefined){
            next();
            return;
        }
        const allRequests = await PlaceRequestCollection.findAll();
        res.status(200).json({
            requests: allRequests.map(constructPlaceRequestResponse)
        });
    },
    async (req: Request, res: Response) => {
        const space = await SpaceCollection.findOne(req.query.space as string);
        const user = await UserCollection.findOneFromGapiUserId(req.query.user as string);
        const allRequests = await PlaceRequestCollection.findByAuthorSpace(space?.place_id, user?.gapiUserId);
        res.status(200).json({
            requests: allRequests.map(constructPlaceRequestResponse)
        });
    }
)

/**
 * @name GET /api/requests/checkin_ranked/{place_id}
 */
router.get(
    "/checkin_ranked/:place_id",
    [
        spaceMiddleware.isPlaceExists
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        const requestsRanked = await PlaceRequestCollection.findRankedBySpace(req.params.place_id as string);
        res.status(200).json({
            checkins: requestsRanked.map(constructPlaceRequestResponse)
        })
    }
)

/**
 * @name POST /api/requests/{place_id}
 */
router.post(
    "/:place_id",
    [
        userMiddleware.isUserLoggedIn,
        spaceMiddleware.isPlaceExists,
        placeRequestMiddleware.isValidCreateRequestPayload
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        const requestPayload = req.body;
        
        const newRequest = await PlaceRequestCollection.addOne(
            await userMiddleware.gapiIdTo_id(req.body.author) as string,
            await spaceMiddleware.place_idTo_id(req.body.space) as string,
            req.body.title,
            req.body.textContent,
            req.body.anonymous
        );
        
        res.status(201).json({
            message: "Request was successfully created.",
            request: constructPlaceRequestResponse(newRequest)
        });
    }
)

/**
 * @name DELETE /api/request/{requestId}
 */
router.delete(
    "/:requestId",
    [
        userMiddleware.isUserLoggedIn,
        placeRequestMiddleware.isRequestExists,
        placeRequestMiddleware.isRequestAuthor

    ],
    async (req: Request, res: Response, next: NextFunction) => {
        const requestId = req.params.requestId;
        await PlaceRequestCollection.deleteOne(requestId);
        res.status(200).json({
            message: "Request was successfully deleted."
        });
    }
)

/**
 * @name PUT /api/request/{requestId}
 */
router.put(
    "/:requestId",
    [
        placeRequestMiddleware.isRequestExists,
        placeRequestMiddleware.isRequestAuthor
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.body.resolved === undefined){
            res.status(400).json({
                message: "Resolved boolean not provided."
            });
            return;
        }
        const requestId = req.params.requestId;
        const newRequest = await PlaceRequestCollection.updateOne(requestId, req.body.resolved);
        if (!newRequest){
            res.status(500).json({
                message: "Unable to update request status."
            }) //should never get here
            return;
        }
        res.status(200).json({
            request: constructPlaceRequestResponse(newRequest)
        })
    }
)

 export { router as requestRouter };