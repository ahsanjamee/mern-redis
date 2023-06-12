import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./router";

const PORT = 8080;
const MONGO_URL =
  "mongodb+srv://ahsan67:NiGnG2VryHVLHJvo@mern-db.a2i2ryl.mongodb.net/?retryWrites=true&w=majority";

const app = express();

// app.use(
//   cors({
//     credentials: true,
//   })
// );

// app.use(compression());
// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

app.use("/", router());
