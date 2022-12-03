import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import express from "express";

import ReplyCollection from "./collection";
import RequestCollection from "../request/collection";
import UserCollection from "../user/collection";

import { constructReplyResponse } from "./util";

import * as userMiddleware from "../user/middleware";
import * as spaceMiddleware from "../space/middleware";
import * as replyMiddleware from "./middleware";

const router = express.Router();

/**
 * @name GET /api/reply?request=requestId&user=userId
 */
router.get(
  "/",
  [
    // insert middleware
  ],
  async (req: Request, res: Response) => {
    const request = await RequestCollection.findOneById(
      req.query.request as string
    );
    const user = await UserCollection.findOneFromGapiUserId(
      req.query.user as string
    );
    const allReplies = await ReplyCollection.findByAuthorSpace(
      request?._id.toString(),
      user?.gapiUserId
    );
    res.status(200).json({
      replies: allReplies.map(constructReplyResponse),
    });
  }
);

/**
 * @name POST /api/replies/{request_id}
 */
router.post(
  "/:place_id",
  [
    // insert middleware
  ],
  async (req: Request, res: Response) => {
    const replyPayload = req.body;

    const newReply = await ReplyCollection.addOne(
      req.body.author,
      req.body.request,
      req.body.textContent,
      //req.body.dateCreated,
      req.body.anonymous
      //req.body.upvotingUsers,
    );

    res.status(201).json({
      message: "Reply was successfully created.",
      reply: constructReplyResponse(newReply),
    });
  }
);

/**
 * @name DELETE /api/reply/{replyId}
 */
router.delete(
  "/",
  [
    // insert middleware
  ],
  async (req: Request, res: Response) => {
    const replyId = req.params.replyId;
    await ReplyCollection.deleteOne(replyId);
    res.status(200).json({
      message: "Reply was successfully deleted.",
    });
  }
);

/**
 * @name PUT /api/reply
 */

export { router as replyRouter };
