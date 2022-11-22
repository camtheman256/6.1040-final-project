import { SessionData } from "express-session";

//apparently we need to declare session types now (starter code used older version of express)
declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

export {};
