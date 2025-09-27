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
}