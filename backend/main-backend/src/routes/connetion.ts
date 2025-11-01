import { Router } from "express";
import { addConnectionDef } from "../controllers/connection";

const router=Router()

router.post("/dev/add-connections-def",addConnectionDef)

export {router as connectionRouter} 