import { google } from "googleapis";

export class GoogleApi {
  private oauth2Client;

  constructor() {
    const clientId = process.env.GOOGLE_CLIENT_ID!;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI!;

    if (clientId || !clientSecret||!redirectUri) {
      throw new Error("Google API credentials are missing in environment variables.");
    }
     this.oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
  }

  getAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
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
