import { Router } from "express";
import path from "path";

import auth from "../../middleware/auth.js";
import { getInscription, getConnexion, getProfile, useConnexion, useInscription, useDeconnexion } from "../../controllers/routing/utilisateurRoute.js";

const router = Router();
const __dirname = path.resolve("./");

router.get("/inscription", getInscription);

router.get("/connexion", getConnexion);

router.get("/", auth, getProfile);

router.post("/connexion", useConnexion);

router.post("/inscription", useInscription);

router.delete("/deconnexion", useDeconnexion);

export default router;
