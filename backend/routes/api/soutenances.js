import { Router } from "express";

import {
    getSoutenances,
    createSoutenance,
    deleteSoutenance,
    updateSoutenance,
} from "../../controllers/soutenance.js";

const router = Router();

router.get("/", getSoutenances);

router.post("/create", createSoutenance);

router.post("/update", updateSoutenance);

router.post("/delete", deleteSoutenance);

export default router;