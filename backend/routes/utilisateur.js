import { Router } from "express";
import path from "path";

import auth from "../middleware/auth.js";
import { connexion, inscription, deconnexion } from "../controllers/utilisateur.js";

const router = Router();
const __dirname = path.resolve("./");

router.get("/inscription", (req, res) => {
  res.sendFile(__dirname + "/frontend/inscription.html");
});

router.get("/connexion", (req, res) => {
  res.sendFile(__dirname + "/frontend/connexion.html");
});

router.get(
  "/",
  auth,
  (req, res) => {
    res.sendFile(__dirname + "/frontend/profil.html");
  },
  (req, res) => {
    windows.location = "/connexion";
  }
);

router.post("/connexion", connexion);
router.post("/inscription", inscription);
router.post("/deconnexion", deconnexion);

export default router;
