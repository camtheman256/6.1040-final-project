import PlaceRequestCollection from "../space/collection";
import UserCollection from "../user/collection";
import type { Request, Response, NextFunction } from "express";

import ReplyCollection from "./collection";

/**
 * Checks if query values in GET request for PlaceRequest is valid, namely,
 * checks if req.query.author and req.query.place exist, if provided
 */
const isValidGetReplyQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorId = req.query.author;
  const requestId = req.query.request;
  if (authorId !== undefined) {
    const user = await UserCollection.findOneFromGapiUserId(authorId as string);
    if (!user) {
      res.status(404).json({
        message: `User with userId: ${authorId} does not exist.`,
      });
      return;
    }
  }
  if (requestId !== undefined) {
    const request = await PlaceRequestCollection.findOne(requestId as string);
    if (!request) {
      res.status(404).json({
        message: `Request with request_id: ${requestId} does not exist.`,
      });
      return;
    }
  }
  next();
};

/**
 * Checks if req.body of POST new request is valid
 */
const isValidCreateReplyPayload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const createRequestPayload = req.body;
  if (
    !createRequestPayload.author ||
    !createRequestPayload.request ||
    !createRequestPayload.textContent ||
    !createRequestPayload.anonymous
  ) {
    res.status(400).json({
      message: `Missing at least one of the following values: [author, request, textContent, anonymous]`,
    });
    return;
  }
  next();
};

/**
 * Checks if req.params.requestId corresponds to a valid request
 */
const isReplyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const replyId = req.params.replyId;
  const reply = await ReplyCollection.findOneById(replyId);
  if (!reply) {
    res.status(404).json({
      message: `Reply with replyId: ${replyId} does not exist.`,
    });
    return;
  }
  next();
};

/**
 * Checks if current session user (req.session.userId) is the author for req.params.requestId
 */
const isReplyAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentUser = await UserCollection.findOneFromGapiUserId(
    req.session.userId as string
  );
  const replyRequest = await ReplyCollection.findOneById(req.params.replyId);
  if (!(replyRequest?.author !== currentUser?.gapiUserId)) {
    res.status(401).json({
      message: `Current user is not the author of reply with replyId ${req.params.replyId}`,
    });
    return;
  }
  next();
};

export {
  isValidGetReplyQuery,
  isValidCreateReplyPayload,
  isReplyExists,
  isReplyAuthor,
};
