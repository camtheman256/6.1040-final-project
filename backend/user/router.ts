import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import express from 'express';

import * as userValidator from './middleware'

const router = express.Router();

/**
 * @name POST /api/users/token-sign-in
 */
router.post(
    '/token-sign-in',
    [
        userValidator.verifyGoogleAuthToken
    ],
    async(req: Request, res: Response) => {
        const googleAuthToken: string = req.body.user_id_token;
        const gapiClientId: string = req.body.client_id;
        const name: string = req.body.profile_name;
        const imageUrl: string = req.body.image_url;
        const email: string = req.body.email;
        res.status(201).json({
            message: "You have signed in successfully."
        })
    }
);

export {router as userRouter};