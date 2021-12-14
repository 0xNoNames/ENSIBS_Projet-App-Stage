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

  var lieux = [{nom:"D0010"}]
  res.render("pages/soutenances", {
    estConnecte: true,
    page: page,
    prenom: req.compte.prenom,
    statut: req.compte.statut,
    estAttribue: req.compte.estAttribue,
    data: data,
    lieux:lieux,
  });
};

export const getUniqueSoutenancePage = async (req, res) => {
  try {
    if (!validator.isAlphanumeric(req.params.id, "fr-FR", { ignore: "'`() -/,&[]@:." })) new Error("L'id contient des caractères invalides");
   } catch (erreur) {
    console.error("ERROR controller/routing/soutenance.js getUniqueSoutenancePage() : " + erreur);
    return res.status(400).json(erreur.message);
  }

  const eleve_soutenance = await CompteModel.findOne({ id: req.params.id });
  var soutenance = await SoutenanceModel.findOne({ id_organisateur: req.params.id });;
  if (!soutenance)
    soutenance = await EntretienModel.findOne({ id_organisateur: req.params.id });

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
