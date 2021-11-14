import { verifierToken, estVerifie, estEtudiantEntreprise } from "../../middleware/auth.js";
import { Router } from "express";
import { getSoutenancesPage,getUniqueSoutenancePage } from "../../controllers/routing/soutenance.js";

const router = Router();

router.get("/", verifierToken, estVerifie, estEtudiantEntreprise, getSoutenancesPage);

router.get("/:id",verifierToken,estVerifie,estEtudiantEntreprise,getUniqueSoutenancePage);

export default router;
