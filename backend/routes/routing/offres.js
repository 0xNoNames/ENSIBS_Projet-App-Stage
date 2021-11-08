import { verifierToken, estValide } from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", verifierToken, estValide, (req, res) => {
  res.render("pages/offres", {
    estConnecte: true,
    page: "offres",
    prenom: req.utilisateur.prenom,
  });
});

export default router;
