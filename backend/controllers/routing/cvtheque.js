import CVModel from "../../models/cv.js";
import CompteModel from "../../models/compte.js";

export const getCvsPage = async (req, res) => {
  try {
    const Cvs = await CVModel.find();
    const comptes = await CompteModel.find();
    res.render("pages/cvtheque", {
      estConnecte: true,
      page: "CVthèque",
      cvs: Cvs,
      comptes: comptes,
      prenom: req.compte.prenom,
      statut: req.compte.statut,
    });
  } catch (error) {
    console.log("controllers/routing/cvtheque.js : ", error);
    res.status(500).json({ message: "Erreur interne." });
  }
};
