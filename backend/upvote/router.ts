import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import express from "express";

import PlaceRequestCollection from "../request/collection";
import { constructPlaceRequestResponse } from "../request/util";
import UserCollection from "../user/collection";
import * as userMiddleware from "../user/middleware";
const router = express.Router();

/**
 * @name POST /api/upvotes/{requestId}
 */
router.post(
  "/:requestId",

  async (req: Request, res: Response) => {
    const request = await PlaceRequestCollection.findOneById(
      req.params["requestId"] as string
    );
    if (!request) {
      res.status(403).json({
        message: `Request with id ${req.params["requestId"]} does not exist`,
      });
      return;
    }
    if (!req.session.userId) {
      res.status(403).json({
        message: "User is not logged in.",
      });
      return;
    }

    const sessionUser = await UserCollection.findOneFromGapiUserId(
      req.session.userId
    );
    if (sessionUser === null) {
      res.status(500).json({
        //should never reach here
        message: "Session user cannot be found",
      });
      return;
    }
    if (request.upvotingUsers.includes(sessionUser?._id)) {
      // this should not happen
      res.status(200).json({
        message: "User has already upvoted this response",
        //request: request,
      });
    } else {
      request.upvotingUsers.push(sessionUser?._id);
      request.save();
      res.status(201).json({
        message: "Upvote was successfully created.",
        //request: constructPlaceRequestResponse(request),
      });
    }
  }
);

/**
 * @name DELETE /api/upvotes/upvotes?requestId=requestId
 */
router.delete(
  "/",

  async (req: Request, res: Response) => {
    const request = await PlaceRequestCollection.findOneById(
      req.query.requestId as string
    );
    if (!request) {
      res.status(403).json({
        message: `Request with id ${req.query.requestId} does not exist`,
      });
      return;
    }
    if (!req.session.userId) {
      res.status(403).json({
        message: "User is not logged in.",
      });
      return;
    }
    const sessionUser = await UserCollection.findOneFromGapiUserId(
      req.session.userId
    );
    if (sessionUser === null) {
      res.status(500).json({
        //should never reach here
        message: "Session user cannot be found",
      });
      return;
    }
    if (!request.upvotingUsers.some((id) => id.equals(sessionUser._id))) {
      // this should not happen
      res.status(200).json({
        message: "User did not upvote this response",
        //request: request,
      });
    } else {
      request.upvotingUsers = request.upvotingUsers.filter(
        (id) => !id.equals(sessionUser._id)
      );
      request.save();
      res.status(201).json({
        message: "Upvote was successfully deleted.",
        //request: constructPlaceRequestResponse(request),
      });
    }
  }
);

export { router as upvoteRouter };
