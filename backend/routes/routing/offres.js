import { verifierToken, estVerifie, estEtudiant } from "../../middleware/auth.js";
import { getOffresPage,getOffreUniquePage } from "../../controllers/routing/offres.js";
import { Router } from "express";

const router = Router();

router.get("/", verifierToken, estVerifie, estEtudiant, getOffresPage);
router.get("/:id", verifierToken, estVerifie, estEtudiant, getOffreUniquePage);


export default router;
