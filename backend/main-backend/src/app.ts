import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import cors from "cors";
import { corsConfig } from "./utils";
import { authRouter } from "./routes";

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
app.get("/api/v1/health", (req, res) => {
  res.send("all cool and running well");
});
app.use("/api/v1/auth",authRouter)

export { httpServer };
