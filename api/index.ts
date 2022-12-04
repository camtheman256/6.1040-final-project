import MongoStore from "connect-mongo";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";

import { userRouter } from "../backend/user/router";
import { spaceRouter } from "../backend/space/router";
import { requestRouter } from "../backend/request/router";
import { checkinRouter } from "../backend/checkin/router";
import { replyRouter } from "../backend/reply/router";

// Configure .env file
dotenv.config();

// Connect to mongoDB
const mongoConnectionUrl = process.env.MONGO_SRV;
if (!mongoConnectionUrl) {
  throw new Error("Please add the MongoDB connection SRV as 'MONGO_SRV'");
}

const client = mongoose
  .connect(mongoConnectionUrl, {
    dbName: process.env.DB_NAME || "dev",
  })
  .then((m) => {
    console.log("Connected to MongoDB");
    return m.connection.getClient();
  });

const app = express();

// Sets up logger
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SECRET || "pizza",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise: client,
      dbName: process.env.DB_NAME || "dev",
    }),
  })
);

app.use("/api/users", userRouter);
app.use("/api/spaces", spaceRouter);
app.use("/api/requests", requestRouter);
app.use("/api/replies", replyRouter);
app.use("/api/checkins", checkinRouter);

app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

app.all("*", (req, res) => {
  res.status(404).json({
    error: "Route not found.",
  });
});

const port = parseInt(process.env.PORT as string) || 8000;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}`);
});

module.exports = app;
