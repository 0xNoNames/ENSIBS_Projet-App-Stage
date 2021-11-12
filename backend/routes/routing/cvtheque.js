import { Router } from "express";
import { verifierToken, estVerifie, estEntreprise } from "../../middleware/auth.js";

const router = Router();


//router.get("/", verifierToken, estVerifie, estEntreprise, (req, res) => {
router.get("/", verifierToken, (req, res) => {
  res.render("pages/cvtheque", {
    estConnecte: true,
    page: "CVthèque",
    prenom: req.compte.prenom,
  });
});

export default router;
