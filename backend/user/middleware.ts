import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import {OAuth2Client} from 'google-auth-library';

/**
 * Verifies integrity of Google Authentication Token on login.
 */
const verifyGoogleAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    const client = new OAuth2Client(req.body.client_id);
    const ticket = await client.verifyIdToken({
        idToken: req.body.user_id_token,
        audience: req.body.client_id
    });
    const payload = ticket.getPayload();
    const userid = payload? payload['sub'] : undefined;
    if (!userid){
        res.status(401).json({
            error: "Could not verify integrity of Google Authentication Token."
        })
    }
    else{
        next();
    }
};

export {
    verifyGoogleAuthToken
};