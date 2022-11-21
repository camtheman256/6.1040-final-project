import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import express from 'express';

import * as userMiddleware from './middleware'

const router = express.Router();

/**
 * @name POST /api/users/token-sign-in
 */
router.post(
    '/token-sign-in',
    async(req: Request, res: Response) => {
        const payload = await userMiddleware.verifyGoogleAuthToken(req, res);
        if (!payload){
            res.status(401).json({
                error: "Could not verify integrity of Google Authentication Token."
            })
            return;
        }
        const gapiUserId: string = payload.sub;
        const gapiClientId: string | undefined = payload.azp;
        const name: string | undefined = payload.name;
        const imageUrl: string | undefined = payload.picture;
        const email: string | undefined = payload.email;
        res.status(201).json({
            message: "You have signed in successfully."
        });
        const userDoc = await userMiddleware.createUserFromGapiAuth(payload);
        req.session.userId = userDoc.gapiUserId;
    }
);

/**
 * @name GET /api/users/session
 */
router.get(
    '/session',
    async(req: Request, res: Response) => {

    }
);



export {router as userRouter};