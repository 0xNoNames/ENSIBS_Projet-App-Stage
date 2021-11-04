import { Router } from "express";

import {
    getCVs,
    createCV,
    updateCV,
    deleteCV,
} from "../../controllers/cvtheque.js";

const router = Router();

router.get("/", getCVs);

router.post("/create", createCV);

router.post("/update", updateCV);

router.post("/delete", deleteCV);

export default router;