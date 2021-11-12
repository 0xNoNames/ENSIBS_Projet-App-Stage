import { verifierToken, estVerifie } from "../../middleware/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", verifierToken, estVerifie, (req, res) => {
  res.render("pages/soutenances", {
    estConnecte: true,
    page: "Soutenances de stage",
    prenom: req.compte.prenom,
  });
});

export default router;
