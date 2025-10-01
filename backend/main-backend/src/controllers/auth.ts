import { Request, Response } from "express";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  AuthHelper,
  RedisService,
} from "../utils";
import { GoogleApi } from "../utils/google";
import { IAuth, OAuth, UserDetails } from "../types";
import { createAccountViaOauth, getUserViaEmail } from "../services/db";
import { ENV } from "../config";
import { getGitHubUser } from "../utils/Github";
export const GoogleAuthInit = asyncHandler((req: Request, res: Response) => {
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
export const GoogleAuthCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const googleApi = new GoogleApi();
    const { code } = req.query;

    if (!code || typeof code !== "string")
      throw new ApiError(400, "Authorization code is missing");

    const tokens = await googleApi.getTokens(code);
    if (!tokens.access_token)
      throw new ApiError(400, "Failed to retrieve access token from Google");

    const userInfo = await googleApi.getUserInfo(tokens.access_token);
    if (!userInfo)
      throw new ApiError(400, "Failed to fetch user info from Google");

    const refinedUser: OAuth = {
      email: userInfo.email!,
      name: userInfo.name!,
      avatarUrl: userInfo.picture!,
      googleId: userInfo.id!,
    };
    console.log(refinedUser)

    let user;
    const existingUser = await getUserViaEmail(userInfo.email!);
    if (existingUser) {
      user = existingUser;
    } else {
      user = await createAccountViaOauth("google", refinedUser);
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    await user.save();
    res.cookie("accessToken", accessToken, {
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
  }
);

export const GitHubAuthInit = asyncHandler(
  async (req: Request, res: Response) => {
    const redirectUri = `https://github.com/login/oauth/authorize?client_id=${ENV.GITHUB_CLIENT_ID}&scope=user:email`;
    return res.redirect(redirectUri);
  }
);

export const GitHubAuthCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const { code } = req.query;

    if (!code || typeof code !== "string")
      throw new ApiError(400, "Authorization code is missing");

    const userInfo = await getGitHubUser(code);
    if (!userInfo)
      throw new ApiError(400, "Failed to fetch user info from Google");

    const refinedUser: OAuth = {
      email: userInfo.email!,
      name: userInfo.name!,
      avatarUrl: userInfo.avatar_url!,
      githubId: JSON.stringify(userInfo.id)!,
    };

    let user;
    const existingUser = await getUserViaEmail(userInfo.email!);
    if (existingUser) {
      user = existingUser;
    } else {
      user = await createAccountViaOauth("google", refinedUser);
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    await user.save();
    res.cookie("accessToken", accessToken, {
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
  }
);

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const redisService = new RedisService();
    const { userId } = req.user;
    const details: UserDetails | null = await redisService.getUserDetails(
      userId
    );

    if (!details) {
      throw new ApiError(404, "User not found");
    }
    return  res.json(new ApiResponse(200, details));
  }
);
