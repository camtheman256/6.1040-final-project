import type { Request, Response, NextFunction } from "express";

import type { HydratedDocument } from "mongoose";
import { OAuth2Client, type TokenPayload } from "google-auth-library";

import UserCollection from "./collection";
import type { User } from "./model";

/**
 * Verifies integrity of Google Authentication Token on login.
 */
async function verifyGoogleAuthToken(
  req: Request,
  res: Response
): Promise<TokenPayload | void> {
  const client = new OAuth2Client(req.body.client_id);
  const ticket = await client.verifyIdToken({
    idToken: req.body.token,
    audience:
      "681310618538-s6g1aq6eposlcsh028n5gu8f68k8l56l.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  return payload;
}

/**
 * Create a new user in collection from Google API userID, if user does not exist yet.
 * @param gapiUserId
 * @returns user document
 */
async function createUserFromGapiAuth(
  payload: TokenPayload
): Promise<HydratedDocument<User>> {
  const user = await UserCollection.findOneFromGapiUserId(payload.iss);
  if (!user) {
    const newUser = await UserCollection.addOne(
      payload.iss,
      payload.name,
      payload.picture,
      payload.email
    );
    return newUser;
  }
  return user;
}

/**
 * Checks if the user is logged in, that is, whether the userId is set in session
 */
const isUserLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    res.status(403).json({
      message: "User is not logged in.",
    });
    return;
  }
  next();
};

/**
 * Checks if the user is signed out, that is, userId is undefined in session
 */
const isUserLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    res.status(403).json({
      error: "You are already signed in.",
    });
    return;
  }

  next();
};

const isCurrentSessionUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.userId) {
    const user = await UserCollection.findOneFromGapiUserId(req.session.userId);
    if (!user) {
      req.session.userId = undefined;
      res.status(500).json({
        message: "User session was not recognized.",
      });
      return;
    }
  }
  next();
};

export {
  verifyGoogleAuthToken,
  createUserFromGapiAuth,
  isUserLoggedIn,
  isUserLoggedOut,
  isCurrentSessionUserExists,
};
