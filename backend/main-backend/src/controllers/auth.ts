import { Request, Response } from "express";
import { ApiError, ApiResponse, asyncHandler } from "../utils";
import { GoogleApi } from "../utils/google";

const googleApi = new GoogleApi();
const GoogleAuthInit = asyncHandler((req: Request, res: Response) => {
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
const GoogleAuthCallback = asyncHandler((req: Request, res: Response) => {
  const { code } = req.query;
    
});

export { GoogleAuthInit, GoogleAuthCallback };
