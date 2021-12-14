import CVModel from "../../models/cv.js";
import CompteModel from "../../models/compte.js";
import MotivationModel from "../../models/motivation.js";

export const getCvsPage = async (req, res) => {
  try {
    const cvs = await CVModel.find();
    const comptes = await CompteModel.find({"estAttribue": true})
    const lms = await MotivationModel.find();

    res.render("pages/cvtheque", {
      estConnecte: true,
      page: "CVthèque",
      cvs: cvs,
      lms: lms,
      comptes: comptes,
      prenom: req.compte.prenom,
      statut: req.compte.statut,
      estAttribue: req.compte.estAttribue,
    });
  } catch (error) {
    console.error("ERROR backend/controllers/routing/cvtheque.js @ getCvsPage() : ", error);
    res.status(500).json({ message: "Erreur interne." });
  }
};
