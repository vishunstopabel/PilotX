import { Document, Types } from "mongoose";

export interface IScope {
  name: string; // scope URL
  description: string; // human-readable meaning
}

export interface IConnectionDef extends Document {
  provider: string;
  service: string;
  displayName: string;
  description?: string;
  iconUrl: string;
  scopes: IScope[];
  authType: "oauth2" | "apiKey";
  isEnabled?: boolean;
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
