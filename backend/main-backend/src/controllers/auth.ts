import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler, AuthHelper } from "../utils";
import { GoogleApi } from "../utils/google";
import { IAuth, OAuth } from "../types";
import { createAccountViaOauth, getUserViaEmail } from "../services/db";
const GoogleAuthInit = asyncHandler((req: Request, res: Response) => {
  const googleApi = new GoogleApi();
  const authUrl = googleApi.getAuthUrl();

  if (!authUrl) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to generate Google OAuth URL"));
  }

  res
    .status(200)
    .json(new ApiResponse(300, authUrl, "Redirect to Google OAuth"));
});
const GoogleAuthCallback = asyncHandler(async (req: Request, res: Response) => {
  const googleApi = new GoogleApi();
  const { code } = req.query;

  if (!code || typeof code !== "string")
    throw new ApiError(400, "Authorization code is missing");

  const tokens = await googleApi.getTokens(code);
  if (!tokens.access_token)
    throw new ApiError(400, "Failed to retrieve access token from Google");

  const userInfo = await googleApi.getUserInfo(tokens.access_token);
  if (!userInfo?.email || !userInfo?.id)
    throw new ApiError(400, "Incomplete user info from Google");

  const refinedUser: OAuth = {
    email: userInfo.email,
    name: userInfo.name || "",
    avatarUrl: userInfo.picture || "",
    googleId: userInfo.id,
  };

  const user = await createAccountViaOauth("google", refinedUser);

  const accessToken = user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    domain: "localhost",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    domain: "localhost",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect("http://localhost:5173/complete-profile");
});

export { GoogleAuthInit, GoogleAuthCallback };
