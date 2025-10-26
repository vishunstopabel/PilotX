import { Document, Types } from "mongoose";

export interface IConnectionDef extends Document {
  id: string;
  provider: string;
  service: string;
  displayName: string;
  description?: string;
  scopes: string[];
  iconUrl: string;
  authType: "oauth2" | "apiKey";
  isEnabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IServiceConnection extends Document {
  id: string;
  userId: Types.ObjectId;
  connectionDefId: Types.ObjectId;
  accountEmail?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: Date;
  status: "connected" | "disconnected";
  createdAt?: Date;
  updatedAt?: Date;
  connectedScops: [];
}
