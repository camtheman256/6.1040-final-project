import type { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import express from "express";

//import * as spaceMiddleware from "./middleware";
//import SpaceCollection from "./collection";
//import { constructSpaceResponse } from "./util";

import * as userMiddleware from "../user/middleware"

const router = express.Router();

/**
 * @name POST /api/spaces
 */
router.post(
    "/spaces",
    [
        userMiddleware.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
        
    }
);

/**
 * @name DELETE /api/spaces
 */

/**
 * @name GET /api/spaces/{spaceId}
 */

