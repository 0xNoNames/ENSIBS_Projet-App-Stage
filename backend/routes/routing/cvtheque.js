import { Router } from "express";
import { verifierToken, estVerifie, estEntreprise } from "../../middleware/auth.js";
import CVModel from "../../models/cv.js";

const router = Router();

router.get("/", verifierToken, estVerifie, estEntreprise, async (req, res) => {
  try {
    const Cvs = await CVModel.find();
  } catch (error) {
    res.error(404).json({ message: error.message });
  }
  res.render("pages/cvtheque", {
    estConnecte: true,
    page: "CVthèque",
    prenom: req.compte.prenom,
    cvs: Cvs,
  });
});

export default router;
