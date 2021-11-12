import { verifierToken, estVerifie, estAdministrateur } from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", verifierToken, estVerifie, estAdministrateur, (req, res) => {
  res.render("pages/offres", {
    estConnecte: true,
    page: "Offres de stage",
    prenom: req.compte.prenom,
  });
});

export default router;
