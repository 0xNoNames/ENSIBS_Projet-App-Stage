import { Router } from "express";
import { verifierToken } from "../../middleware/auth.js";

const router = Router();

router.get("/", verifierToken, (req, res) => {
  res.render("pages/contact", {
    estConnecte: req.estConnecte,
    page: "Contact",
    prenom: req.compte.prenom,
  });
});

export default router;
