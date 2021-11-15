import OffreModel from "../../models/offre.js";

export const getOffresPage = async (req, res) => {
  try {
    var offresValides;
    if (req.compte.statut == "administrateur") {
      offresValides = await OffreModel.find({estValide: true});
    } else {
      offresValides = await OffreModel.find({ statut: req.compte.statut,estValide:true });
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



export const getOffreUniquePage = async (req,res) => {
  var id = req.params.id

  const offre = await OffreModel.findOne({id: id});

  res.render("pages/offreUnique", {
      estConnecte: true,
      page: "OffreUnique",
      prenom: req.compte.prenom,
      statut: req.compte.statut,
      estAttribue: req.compte.estAttribue,
      offre : offre,
    });
}