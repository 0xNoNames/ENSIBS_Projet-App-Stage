import estConnecte from "../../middleware/estConnecte.js";
import { Router } from "express";
import estValide from "../../middleware/estValide.js";

const router = Router();

router.get("/", estConnecte, estValide, (req, res) => {
  res.render("pages/cvtheque", {
    estConnecte: true,
    page: "cvtheque",
    prenom: req.utilisateur.prenom,
  });
});

export default router;
