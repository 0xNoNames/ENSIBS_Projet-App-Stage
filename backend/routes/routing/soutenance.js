import { verifierToken, estVerifie } from "../../middleware/auth.js";
import { Router } from "express";
import { getSoutenancesPage } from "../../controllers/routing/soutenance.js";

const router = Router();

router.get("/", verifierToken, estVerifie, getSoutenancesPage);

export default router;
