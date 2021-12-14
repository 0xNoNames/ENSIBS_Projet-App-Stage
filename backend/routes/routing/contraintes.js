import { getContraintesPage } from "../../controllers/routing/contraintes.js";
import { verifierToken, estVerifie } from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", verifierToken, getContraintesPage);

export default router;