import { Router } from "express";
import { verifierToken, estValide } from "../../middleware/auth.js";

const router = Router();

router.get("/", verifierToken, (req, res) => {
  res.render("pages/cvtheque", {
    estConnecte: true,
    page: "CVthèque",
    prenom: req.compte.prenom,
  });
});

export default router;
