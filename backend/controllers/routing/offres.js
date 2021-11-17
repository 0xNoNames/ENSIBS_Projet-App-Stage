import OffreModel from "../../models/offre.js";

export const getOffresPage = async (req, res) => {
  try {
    if (req.compte.statut == "Administrateur") {
      var offresValides = await OffreModel.find({ estValide: true });
    } else if (req.compte.statut == "Entreprise") {
      var offresValides = await OffreModel.find({ id_entreprise: req.compte.id });
    } else {
      var offresValides = await OffreModel.find({ formation: req.compte.statut, estValide: true });
    }

    var offresNonValide = await OffreModel.find({ estValide: false });

    res.render("pages/offres", {
      estConnecte: true,
      page: "Offres",
      offresValides: offresValides,
      prenom: req.compte.prenom,
      statut: req.compte.statut,
      estAttribue: req.compte.estAttribue,
      offresNonValide: offresNonValide,
    });
  } catch (error) {
    console.log("controllers/routing/offres.js : ", error);
    res.status(500).json({ message: "Erreur interne." });
  }
};

export const getOffreUniquePage = async (req, res) => {
  const offre = await OffreModel.findOne({ id: req.params.id });

  res.render("pages/offreUnique", {
    estConnecte: true,
    page: "OffreUnique",
    prenom: req.compte.prenom,
    statut: req.compte.statut,
    estAttribue: req.compte.estAttribue,
    offre: offre,
  });
};
