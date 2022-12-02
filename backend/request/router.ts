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
    async (req: Request, res: Response, next: NextFunction) => {
        if (req.query.space !== undefined || req.query.user !== undefined){
            next();
            return;
        }
        const allRequests = await PlaceRequestCollection.findAll();
        res.status(200).json({
            requests: allRequests.map(constructPlaceRequestResponse)
        })
    },
    [
        userMiddleware.isUserLoggedIn,
        placeRequestMiddleware.isValidGetPlaceRequestQuery
    ],
    async (req: Request, res: Response) => {
        const space = await SpaceCollection.findOne(req.query.space as string);
        const user = await UserCollection.findOneFromGapiUserId(req.query.user as string);
        const allRequests = await PlaceRequestCollection.findByAuthorSpace(space?.place_id, user?.gapiUserId);
        res.status(200).json({
            requests: allRequests.map(constructPlaceRequestResponse)
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
            req.body.author,
            req.body.space,
            req.body.title,
            req.body.textContent,
            //req.body.dateCreated,
            req.body.tags,
            req.body.anonymous,
            //req.body.upvotingUsers,
            //req.body.resolved,
            //req.body.inProcess
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
    "/",
    [
        userMiddleware.isUserLoggedIn,
        placeRequestMiddleware.isRequestExists,
        placeRequestMiddleware.isRequestAuthor

    ],
    async (req: Request, res: Response, next: NextFunction) => {
        const requestId = req.params.requestId
        await PlaceRequestCollection.deleteOne(requestId);
        res.status(200).json({
            message: "Request was successfully deleted."
        })
    }
)

/**
 * @name PUT /api/request
 */

 export { router as requestRouter };