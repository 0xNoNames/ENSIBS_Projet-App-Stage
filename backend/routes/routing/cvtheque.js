import { Router } from "express";
import { verifierToken, estVerifie, estEntreprise } from "../../middleware/auth.js";
import CVModel from "../../models/cv.js";

const router = Router();


/* RAJOUTER estEntreprise */
router.get("/", verifierToken, estVerifie, async (req, res) => {
  try {
    const Cvs = await CVModel.find();
    res.render("pages/cvtheque", {
      estConnecte: true,
      page: "CVthèque",
      prenom: req.compte.prenom,
      cvs: Cvs,
    });
  } catch (error) {
    res.error(404).json({ message: error.message });
  }
});

export default router;
