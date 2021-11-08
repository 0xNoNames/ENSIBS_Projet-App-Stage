import { Router } from "express";
import estConnecte from "../../middleware/estConnecte.js";

const router = Router();

router.get("/", estConnecte, (req, res) => {
  res.render("pages/contact", {
    estConnecte: req.estConnecte,
    page: "contact",
    prenom: req.utilisateur.prenom
  });
});

export default router;
