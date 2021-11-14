import { verifierToken, estVerifie, estDataEntreprise } from "../../middleware/auth.js";
import { Router } from "express";
import { getSoutenancesPage } from "../../controllers/routing/soutenance.js";

const router = Router();

router.get("/", verifierToken, estVerifie, estDataEntreprise, getSoutenancesPage);

export default router;
