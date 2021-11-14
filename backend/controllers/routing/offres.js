import OffreModel from "../../models/offre.js";

export const getOffresPage = async (req, res) => {
  try {
    var offres;
    if (req.compte.statut == "administrateur") {
      offres = await OffreModel.find();
    } else {
      offres = await OffreModel.find({ statut: req.compte.statut });
    }
    res.render("pages/offres", {
      estConnecte: true,
      page: "Offres",
      offres: offres,
      prenom: req.compte.prenom,
      statut: req.compte.statut,
    });
  } catch (error) {
    console.log("controllers/routing/offres.js : ", error);
    res.status(500).json({ message: "Erreur interne." });
  }
};
