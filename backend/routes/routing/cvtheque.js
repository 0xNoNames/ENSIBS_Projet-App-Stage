import { Router } from "express";
import { verifierToken, estVerifie, estEntreprise } from "../../middleware/auth.js";
import { getCvsPage } from "../../controllers/routing/cvtheque.js";

const router = Router();

router.get("/", verifierToken, estVerifie, estEntreprise, getCvsPage);

export default router;
