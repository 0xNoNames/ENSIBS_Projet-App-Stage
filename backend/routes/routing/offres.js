import { verifierToken, estValide } from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", verifierToken, estValide, (req, res) => {
  res.render("pages/offres", {
    estConnecte: true,
    page: "Offres de stage",
    prenom: req.compte.prenom,
  });
});

export default router;
