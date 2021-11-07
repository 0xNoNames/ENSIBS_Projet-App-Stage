import { Router } from "express";
import path from "path";

import auth from "../../middleware/auth.js";
import { getInscriptionPage, getConnexionPage, getComptePage, useConnexion, useInscription, useDeconnexion } from "../../controllers/routing/compte.js";

const router = Router();
const __dirname = path.resolve("./");

router.get("/inscription", getInscriptionPage);

router.get("/connexion", getConnexionPage);

router.get("/", auth, getComptePage);

router.post("/connexion", useConnexion);

router.post("/inscription", useInscription);

router.delete("/deconnexion", useDeconnexion);

export default router;