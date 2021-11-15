import { getMotivationPage } from "../../controllers/routing/motivation.js";
import { Router } from "express";
import { verifierToken, estVerifie, estEtudiant } from "../../middleware/auth.js";

const router = Router();

router.get("/", verifierToken, estVerifie, estEtudiant, getMotivationPage);

export default router;
