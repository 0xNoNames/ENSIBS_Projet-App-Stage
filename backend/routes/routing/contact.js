import { Router } from "express";
import { verifierToken } from "../../middleware/auth.js";

const router = Router();

router.get("/", verifierToken, (req, res) => {
  res.render("pages/contact", {
    estConnecte: req.estConnecte,
    page: "contact",
    prenom: req.utilisateur.prenom,
  });
});

export default router;
