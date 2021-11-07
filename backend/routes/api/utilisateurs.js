import { Router } from "express";
import path from "path";

import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";
import { getUtilisateurs } from "../controllers/utilisateurAPI.js";

const router = Router();
const __dirname = path.resolve("./");

router.get("/users", authAdmin, getUtilisateurs);

export default router;