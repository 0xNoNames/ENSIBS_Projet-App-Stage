import { verifierToken, estVerifie, estEtudiant } from "../../middleware/auth.js";
import { getOffrePage } from "../../controllers/routing/offres.js";
import { Router } from "express";

const router = Router();

router.get("/", verifierToken, estVerifie, estEtudiant, getOffrePage);

export default router;
