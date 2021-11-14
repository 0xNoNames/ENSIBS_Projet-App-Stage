import { verifierToken, estVerifie, estEtudiantEntreprise } from "../../middleware/auth.js";
import { Router } from "express";
import { getSoutenancesPage } from "../../controllers/routing/soutenance.js";

const router = Router();

router.get("/", verifierToken, estVerifie, estEtudiantEntreprise, getSoutenancesPage);

export default router;
