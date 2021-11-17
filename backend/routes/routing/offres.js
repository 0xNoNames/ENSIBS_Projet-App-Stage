import { verifierToken, estVerifie, estEtudiant } from "../../middleware/auth.js";
import { getOffresPage, getOffreUniquePage } from "../../controllers/routing/offres.js";
import { Router } from "express";

const router = Router();

router.get("/", verifierToken, estVerifie, getOffresPage);
router.get("/:id", verifierToken, estVerifie, getOffreUniquePage);

export default router;
