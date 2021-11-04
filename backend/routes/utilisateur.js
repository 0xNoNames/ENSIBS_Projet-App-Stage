import { Router } from "express";
import path from "path";

import {connexion, inscription} from "../controllers/utilisateur.js"

const router = Router();
const __dirname = path.resolve("./");

router.get("/inscription", (req, res) => {
  res.sendFile(__dirname + "/frontend/inscription.html");
});

router.get("/connexion", (req, res) => {
  res.sendFile(__dirname + "/frontend/connexion.html");
});

router.get("/", isSignedIn, (req, res) => {
  res.sendFile(__dirname + "/frontend/profil.html");
});

router.post("/connexion", connexion);
router.post("/inscrption", inscription);
router.post("/deconnexion", deconnexion);

export default router;
