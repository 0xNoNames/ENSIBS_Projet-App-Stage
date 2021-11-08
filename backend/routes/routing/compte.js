import { getInscriptionPage, getConnexionPage, getComptePage, useConnexion, useInscription, useDeconnexion } from "../../controllers/routing/compte.js";
import { verifierToken, estValide } from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/inscription", verifierToken, getInscriptionPage);

router.get("/connexion", verifierToken, getConnexionPage);

router.get("/", verifierToken, estValide, getComptePage);

router.post("/connexion", verifierToken, useConnexion);

router.post("/inscription", verifierToken, useInscription);

router.delete("/deconnexion", verifierToken, useDeconnexion);

export default router;
