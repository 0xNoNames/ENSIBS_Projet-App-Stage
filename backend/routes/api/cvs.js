import { Router } from "express";

import auth from "../../middleware/auth.js";
import { getCVs, createCV, updateCV, deleteCV } from "../../controllers/cvtheque.js";

const router = Router();

router.get("/", auth, getCVs);

router.post("/create", auth, createCV);

router.post("/update", auth, updateCV);

router.post("/delete", auth, deleteCV);

export default router;
