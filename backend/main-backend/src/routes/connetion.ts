import { Router } from "express";
import { addConnectionDef, getAllServices } from "../controllers";
import { isAuthenticated } from "../middleware";

const router = Router();

router.post("/dev/add-connections-def", addConnectionDef);
router.get("/get-all-connetions",isAuthenticated, getAllServices);
export { router as connectionRouter };
