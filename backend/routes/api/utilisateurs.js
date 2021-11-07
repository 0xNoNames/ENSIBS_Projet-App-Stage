import { Router } from "express";
import path from "path";

import authAdmin from "../../middleware/authAdmin.js";
import { getUtilisateurs } from "../../controllers/api/utilisateurs.js";

const router = Router();

router.get("/", authAdmin, getUtilisateurs);

router.get("/XD", getUtilisateurs);

export default router;