import { Document } from "mongoose";

export interface JwtPayload {
  userId: string;
  email: string;
}
export interface IAuth extends Document {
  name?: string;
  email?: string;
  password?: string;
  refreshToken?: string;
  isEmailVerified: boolean;
  provider: "local" | "google" | "github";
  googleId?: string;
  githubId?: string;
  generateRefreshToken: () => Promise<string>;
  generateAccessToken: () => string;
}
export type Provider = "google" | "github";

export interface OAuth {
  name: string;
  email: string;
  avatarUrl: string;
  googleId?: string;
  githubId?: string;
}


export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  email?: string;
  name?: string;
  [key: string]: any;
}