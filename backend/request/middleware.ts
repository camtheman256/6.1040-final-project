import SpaceCollection from "../space/collection";
import UserCollection from "../user/collection";
import type { Request, Response, NextFunction } from "express";
import { exists } from "fs";

import type { HydratedDocument } from "mongoose";

import PlaceRequestCollection from "./collection";
import type { PlaceRequest } from "./model";

/**
 * Checks if query values in GET request for PlaceRequest is valid, namely,
 * checks if req.query.author and req.query.place exist, if provided
 */
const isValidGetPlaceRequestQuery = async(req: Request, res: Response, next: NextFunction) => {
    const authorId = req.query.author;
    const placeId = req.query.space;
    if (authorId !== undefined){
        const user = await UserCollection.findOneFromGapiUserId(authorId as string);
        if (!user) {
            res.status(404).json({
                message: `User with userId: ${authorId} does not exist.`
            });
            return;
        }
    }
    if (placeId !== undefined){
        const space = await SpaceCollection.findOne(placeId as string);
        if (!space) {
            res.status(404).json({
                message: `Space with place_id: ${placeId} does not exist.`
            });
            return;
        }
    }
    next();
};

/**
 * Checks if req.body of POST new request is valid
 */
const isValidCreateRequestPayload = async(req: Request, res: Response, next: NextFunction) => {
    const createRequestPayload = req.body;
    if(!createRequestPayload.author || !createRequestPayload.space ||
        !createRequestPayload.title || !createRequestPayload.textContent ||
        !createRequestPayload.anonymous || !createRequestPayload.tags){
            res.status(400).json({
                message: `Missing at least one of the following values: [author, space, title, textContent, anonymous]`
            });
            return;
        }
    next();
}

/**
 * Checks if req.params.requestId corresponds to a valid request
 */
const isRequestExists = async(req: Request, res: Response, next: NextFunction) =>{
    const requestId = req.params.requestId
    const placeRequest = await PlaceRequestCollection.findOneById(requestId);
    if (!placeRequest) {
        res.status(404).json({
            message: `Request with requestId: ${requestId} does not exist.`
        });
        return;
    }
    next();
}

/**
 * Checks if current session user (req.session.userId) is the author for req.params.requestId
 */
const isRequestAuthor = async(req: Request, res: Response, next: NextFunction) => {
    const currentUser = await UserCollection.findOneFromGapiUserId(req.session.userId as string);
    const placeRequest = await PlaceRequestCollection.findOneById(req.params.requestId);
    if (!(placeRequest?.author !== currentUser?.gapiUserId)){
        res.status(401).json({
            message: `Current user is not the author of request with requestId ${req.params.requestId}`
        })
        return;
    }
    next();
}

export {
    isValidGetPlaceRequestQuery,
    isValidCreateRequestPayload,
    isRequestExists,
    isRequestAuthor
}