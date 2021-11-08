import estConnecte from "../../middleware/estConnecte.js";

import estValide from "../../middleware/estValide.js";
import { Router } from "express";

const router = Router();

router.get("/", estConnecte, estValide, (req, res) => {
  res.render("pages/soutenances", {
    estConnecte: true,
    page: "soutenances",
    prenom: req.utilisateur.prenom,
  });
});

export default router;
