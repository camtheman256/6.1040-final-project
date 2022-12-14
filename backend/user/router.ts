import type { Request, Response, NextFunction } from "express";
import express from "express";

import * as userMiddleware from "./middleware";
import UserCollection from "./collection";
import { constructUserResponse } from "./util";


const router = express.Router();

/**
 * @name POST /api/users/session/token-auth
 */
router.post(
  "/session/token-auth",
  [userMiddleware.isUserLoggedOut],
  async (req: Request, res: Response) => {
    const payload = await userMiddleware.verifyGoogleAuthToken(req, res);
    if (!payload) {
      res.status(401).json({
        error: "Could not verify integrity of Google Authentication Token.",
      });
      return;
    }
    const userDoc = await userMiddleware.createUserFromGapiAuth(payload);
    req.session.userId = userDoc.gapiUserId;
    res.status(200).json({
      message: "You have signed in successfully.",
      user: constructUserResponse(userDoc),
    });
  }
);

/**
 * @name DELETE /api/users/session/token-auth
 */
router.delete(
  "/session/token-auth",
  [userMiddleware.isUserLoggedIn],
  async (req: Request, res: Response) => {
    req.session.userId = undefined;
    res.status(200).json({
      message: "You have been logged out successfully.",
    });
  }
);

/**
 * @name GET /api/users/session
 */
router.get(
  "/session",
  [userMiddleware.isUserLoggedIn],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? "";
    const user = await UserCollection.findOneFromGapiUserId(userId);
    if (!user) {
      res.status(404).json({
        message: "Cannot find current session user.",
      });
    } else {
      res.status(200).json({
        user: constructUserResponse(user),
      });
    }
  }
);

export { router as userRouter };
