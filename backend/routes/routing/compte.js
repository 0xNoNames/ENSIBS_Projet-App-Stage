import { getInscriptionPage, getConnexionPage, getComptePage, useConnexion, useInscription, useDeconnexion } from "../../controllers/routing/compte.js";
import estConnecte from "../../middleware/estConnecte.js";
import estValide from "../../middleware/estValide.js";
import { Router } from "express";

const router = Router();

router.get("/inscription", estConnecte, getInscriptionPage);

router.get("/connexion", estConnecte, getConnexionPage);

router.get("/", estConnecte, estValide, getComptePage);

router.post("/connexion", estConnecte, useConnexion);

router.post("/inscription", estConnecte, useInscription);

router.delete("/deconnexion", estConnecte, useDeconnexion);

export default router;
