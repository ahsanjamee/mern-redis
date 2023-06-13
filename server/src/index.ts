import cors from "cors";
import bodyParser from "body-parser";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import router from "./router";
import * as redis from "redis";
import "dotenv/config";

const PORT = 8080;
const MONGO_URL = process.env.MONGO_URL;

const url = process.env.REDIS_URL;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

const server = http.createServer(app);

export const redisClient = redis.createClient({ url });

(async () => {
  await redisClient.connect();
})();

redisClient.on("connect", () => console.log("Redis redisClient Connected"));
redisClient.on("error", (err) =>
  console.log("Redis Client Connection Error", err)
);

server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

app.use("/", router());
