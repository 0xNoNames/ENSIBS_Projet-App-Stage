import { getInscriptionPage, getConnexionPage, getComptePage, getAidePage } from "../../controllers/routing/compte.js";
import { verifierToken, estValide } from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/inscription", verifierToken, getInscriptionPage);

router.get("/connexion", verifierToken, getConnexionPage);

router.get("/", verifierToken, estValide, getComptePage);

router.get("/aide", verifierToken, getAidePage);

export default router;
