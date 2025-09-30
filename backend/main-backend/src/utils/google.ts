import { google } from "googleapis";
import { ENV } from "../config/env";

export class GoogleApi {
  private oauth2Client;

  constructor() {
    if (
      !ENV.GOOGLE_CLIENT_ID ||
      !ENV.GOOGLE_CLIENT_SECRET ||
      !ENV.GOOGLE_REDIRECT_URI
    ) {
      throw new Error(
        "Google API credentials are missing in environment variables."
      );
    }

    this.oauth2Client = new google.auth.OAuth2(
      ENV.GOOGLE_CLIENT_ID,
      ENV.GOOGLE_CLIENT_SECRET,
      ENV.GOOGLE_REDIRECT_URI
    );
  }

  getAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    });
  }

  async getTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);
    return tokens;
  }
}
