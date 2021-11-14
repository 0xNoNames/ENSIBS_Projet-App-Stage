import SoutenanceModel from "../../models/soutenance.js";
import EntretienModel from "../../models/entretien.js";
import CompteModel from "../../models/compte.js";

export const getSoutenancesPage = async (req, res) => {
  if (req.baseUrl == "/soutenances") {
    var page = "Soutenances";
    var data = await SoutenanceModel.find();
  } else {
    var page = "Entretiens";
    var data = await EntretienModel.find();
  }
  res.render("pages/soutenances", {
    estConnecte: true,
    page: page,
    prenom: req.compte.prenom,
    statut: req.compte.statut,
    estAttribue: req.compte.estAttribue,
    data: data,
  });
};

export const getUniqueSoutenancePage = async (req, res) => {
  const soutenance = await SoutenanceModel.findOne({ id_organisateur: req.params.id });
  const eleve_soutenance = await CompteModel.findOne({ id: req.params.id });
  //console.log("SOUTENANCE ROUTING COUNROLLER  : " + soutenance)

  res.render("pages/soutenanceUnique", {
    estConnecte: true,
    page: "Soutenance",
    prenom: req.compte.prenom,
    statut: req.compte.statut,
    estAttribue: req.compte.estAttribue,
    soutenance: soutenance,
    eleve: eleve_soutenance,
  });
};
