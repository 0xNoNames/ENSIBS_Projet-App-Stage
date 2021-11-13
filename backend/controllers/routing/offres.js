import OffreModel from "../../models/offre.js";

export const getOffrePage = async (req, res) => {
  try {
    const offres = await OffreModel.find({ statut: req.compte.status });
    res.render("pages/offres", {
      estConnecte: true,
      page: "Offres",
      offres: offres,
      prenom: req.compte.prenom,
    });
  } catch (error) {
    console.log("controllers/routing/routing.js : ", error);
    res.status(500).json({ message: "Erreur interne." });
  }
};
