import SoutenanceModel from "../../models/soutenance.js";

var lieux = [{ nom: "D0010" }];

export const getSoutenancesPage = async (req, res) => {
  res.render("pages/soutenances", {
  estConnecte: true,
  page: "Soutenances de stage",
  prenom: req.compte.prenom,
  lieux: lieux
  });
};
