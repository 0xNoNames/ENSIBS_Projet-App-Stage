import estConnecte from "../../middleware/estConnecte.js";
import estValide from "../../middleware/estValide.js";
import { Router } from "express";

const router = Router();

router.get("/", estConnecte, estValide, (req, res) => {
  res.render("pages/offres", {
    estConnecte: true,
    page: "offres",
    prenom: req.utilisateur.prenom,
  });
});

export default router;
