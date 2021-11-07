import { getInscriptionPage, getConnexionPage, getComptePage, useConnexion, useInscription, useDeconnexion } from "../../controllers/routing/compte.js";
import auth from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/inscription", getInscriptionPage);

router.get("/connexion", getConnexionPage);

router.get("/", auth, getComptePage);

router.post("/connexion", useConnexion);

router.post("/inscription", useInscription);

router.delete("/deconnexion", useDeconnexion);

export default router;
