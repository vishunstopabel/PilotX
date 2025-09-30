import express, { Router } from "express";
import { GoogleAuthCallback, GoogleAuthInit } from "../controllers";

const authRouter: Router = express.Router();

authRouter.get("/google/oauth-init", GoogleAuthInit);
authRouter.get("/google/callback", GoogleAuthCallback);

export { authRouter };
