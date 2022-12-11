import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import express from "express";

import CheckInCollection from "./collection";
import SpaceCollection from "../space/collection";
import UserCollection from "../user/collection";

import { constructCheckInResponse } from "./util";

import * as userMiddleware from "../user/middleware"
import * as spaceMiddleware from "../space/middleware"
import * as checkInMiddleware from "./middleware"

const router = express.Router();

/**
 * @name POST /api/checkin/session/{place_id}
 */
 router.post(
    "/session/:place_id",
    [
        userMiddleware.isUserLoggedIn,
        //validator for geolocation? [TODO]
        spaceMiddleware.isPlaceExists,
        checkInMiddleware.isSessionUserNotCheckInToday,
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        const newCheckIn = await CheckInCollection.addOne(req.session.userId as string, req.params.place_id);

        res.status(201).json({
            message: "Successfully checked in!",
            checkin: constructCheckInResponse(newCheckIn)
        });
    }
)

/**
 * @name GET /api/checkin/today/session
 */
router.get(
    "/today/session",
    [
        userMiddleware.isUserLoggedIn,
        //spaceMiddleware.isPlaceExists,
        //checkInMiddleware.isSessionUserNotCheckInToday,
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        const todayCheckIn = await CheckInCollection.findOneToday(req.session.userId as string /*req.params.place_id*/);
        if (!todayCheckIn){
            res.status(404).json({
                message: "You have not checked in yet today."
            });
            return;
        }
        res.status(200).json({
            checkin: constructCheckInResponse(todayCheckIn)
        });
    }
)

/**
 * @name GET /api/checkin?space=placeId&user=userId
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
        const allCheckIns = await CheckInCollection.findAll();
        res.status(200).json({
            requests: allCheckIns.map(constructCheckInResponse)
        });
    },
    async (req: Request, res: Response) => {
        const space = await SpaceCollection.findOne(req.query.space as string);
        const user = await UserCollection.findOneFromGapiUserId(req.query.user as string);
        const checkIns = await CheckInCollection.findAllByUserSpace(user?.gapiUserId, space?.place_id);
        res.status(200).json({
            checkins: checkIns.map(constructCheckInResponse)
        });
    }
)

/**
 * @name GET /api/checkin/count/{place_id}
 */
router.get(
    "/count/:place_id",
    [
        spaceMiddleware.isPlaceExists
    ],
    async (req: Request, res: Response, next: NextFunction) => {
        const checkIns = await CheckInCollection.findAllBySpace(req.params.place_id);
        const finalCheckInCounts: Map<string, number> = checkInMiddleware.countCheckInsByUser(checkIns);
        res.status(200).json({
            checkInCounts: Array.from( finalCheckInCounts ).map(([key, value]) => ({ userId: key, count: value }))
        });
    }
)

export { router as checkinRouter };