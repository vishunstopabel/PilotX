import { Request, Response } from "express";
import { asyncHandler } from "../utils";
import { ServiceConnection } from "../models/connect/serviceConnection";
import { ConnectionDefinition } from "../models/connect/connectionDefinition";
import { IConnectionDef, IServiceConnection } from "../types";

const connectToService = asyncHandler(
  async (req: Request, res: Response) => {}
);

export const getAllServices = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.user;

    const userConnections = await ServiceConnection.find({ userId })
      .select("status scopes connectionDefId userId")
      .populate("connectionDefId");

    const allAvailableConnections = await ConnectionDefinition.find({
      isEnabled: true,
    }).lean();

    const finalConnections = allAvailableConnections.map(
      (def: IConnectionDef) => {
        const userConn = userConnections.find(
          (sc: IServiceConnection) => sc.connectionDefId._id === def._id
        );

        if (userConn) {
          return {
            ...def,
            isConnected: true,
            status: userConn.status,
            connectedScopes: userConn.connectedScops || [],
          };
        } else {
          return {
            ...def,
            isConnected: false,
            status: "disconnected",
            connectedScopes: [],
          };
        }
      }
    );

    return res.status(200).json({
      success: true,
      data: finalConnections,
    });
  }
);

export const addConnectionDef = asyncHandler(
  async (req: Request, res: Response) => {
    const connectionDefs: IConnectionDef[] = req.body;

    if (!Array.isArray(connectionDefs) || connectionDefs.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "Request body must be a non-empty array of connection definitions.",
      });
    }

    const existing = await ConnectionDefinition.find({
      $or: connectionDefs.map((def) => ({
        provider: def.provider,
        service: def.service,
      })),
    }).select("provider service");

    const existingKeys = new Set(
      existing.map((e) => `${e.provider}:${e.service}`)
    );
    const newDefs = connectionDefs.filter(
      (def) => !existingKeys.has(`${def.provider}:${def.service}`)
    );

    if (newDefs.length === 0) {
      return res.status(200).json({
        success: false,
        message: "All provided connection definitions already exist.",
      });
    }

    const inserted = await ConnectionDefinition.insertMany(newDefs);

    return res.status(201).json({
      success: true,
      message: `${inserted.length} connection definition(s) added successfully.`,
      data: inserted,
    });
  }
);
