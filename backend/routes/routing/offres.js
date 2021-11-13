import { verifierToken, estVerifie, estAdministrateur } from "../../middleware/auth.js";
import { offrePageLog, offrePageData } from "../../controllers/routing/offres.js";
import { Router } from "express";

const router = Router();

/*router.get("/", verifierToken, estVerifie, estAdministrateur, (req, res) => {
  res.render("pages/offres", {
    estConnecte: true,
    page: "Offres de stage",
    prenom: req.compte.prenom,
  });
});*/

router.get("/", verifierToken, estVerifie, offrePageData);

export default router;
