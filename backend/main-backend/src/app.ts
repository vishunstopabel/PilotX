import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import cors from "cors";
import { corsConfig } from "./utils";
const app: Application = express();
const httpServer = createServer(app);

app.use(cors(corsConfig));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

export {httpServer}
