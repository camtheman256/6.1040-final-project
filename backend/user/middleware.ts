import type {Request, Response, NextFunction} from 'express';
import {HydratedDocument, Types} from 'mongoose';
import {OAuth2Client, TokenPayload} from 'google-auth-library';

import UserCollection from './collection';
import type {User} from './model';

/**
 * Verifies integrity of Google Authentication Token on login.
 */
async function verifyGoogleAuthToken(req: Request, res: Response): Promise<TokenPayload | void>{
    const client = new OAuth2Client(req.body.client_id);
    const ticket = await client.verifyIdToken({
        idToken: req.body.user_id_token,
        audience: req.body.client_id
    });
    const payload = ticket.getPayload();
    return payload;
};

/**
 * Create a new user in collection from Google API userID, if user does not exist yet. 
 * @param gapiUserId 
 * @returns user document
 */
async function createUserFromGapiAuth(payload: TokenPayload): Promise<HydratedDocument<User>>{
    const user = await UserCollection.findOneFromGapiUserId(payload.iss);
    if (!user){
        const newUser = await UserCollection.addOne(payload.iss, payload.name, payload.picture, payload.email);
        return newUser;
    }
    return user;
};



export {
    verifyGoogleAuthToken,
    createUserFromGapiAuth
};