import { Router } from "express";
import { verifierToken, estVerifie, estEntreprise } from "../../middleware/auth.js";
import { getCvPage } from "../../controllers/routing/cvtheque.js";

const router = Router();

/* RAJOUTER estEntreprise */
/*router.get("/", verifierToken, estVerifie, async (req, res) => {
  try {
    const Cvs = await CVModel.find();
    res.render("pages/cvtheque", {
      estConnecte: true,
      page: "CVthèque",
      username: req.compte.prenom+"_"+req.compte.nom,
      cvs: Cvs,
      prenom:req.compte.prenom,
      userid:req.compte.id
    });
  } catch (error) {
    res.error(404).json({ message: error.message });
  }
});*/

router.get("/", verifierToken, estVerifie, estEntreprise, getCvPage);

export default router;
