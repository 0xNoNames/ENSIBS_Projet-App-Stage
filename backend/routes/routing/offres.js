import { verifierToken, estVerifie, estEtudiant } from "../../middleware/auth.js";
import { getOffresPage } from "../../controllers/routing/offres.js";
import { Router } from "express";

const router = Router();

router.get("/", verifierToken, estVerifie, estEtudiant, getOffresPage);

export default router;
