import { axiosInstance } from "@/utils";

export class AuthServices {
  static async googleOauthInit() {
    try {
      const response = await axiosInstance.get("/auth/google/oauth-init");
      return response.data;
    } catch (error) {
      console.error("Error in AuthService.googleOauthInit:", error);
      throw error;
    }
  }
  static async googleGithubInit() {
    try {
      const response = await axiosInstance.get("/auth/github/oauth-init");
      return response.data;
    } catch (error) {
      console.error("Error in AuthService.githubOauthInit:", error);
      throw error;
    }
  }
}


