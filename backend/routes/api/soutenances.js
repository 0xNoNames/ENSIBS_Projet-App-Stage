import { Router } from "express";

import auth from "../../middleware/auth.js";
import { getSoutenances, createSoutenance, deleteSoutenance, updateSoutenance } from "../../controllers/api/soutenanceAPI.js";

const router = Router();

router.get("/", auth, getSoutenances);

router.post("/create", auth, createSoutenance);

router.post("/update", auth, updateSoutenance);

router.post("/delete", auth, deleteSoutenance);

export default router;
