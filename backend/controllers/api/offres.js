import validator from "validator";
import OffreModel from "../../models/offre.js";
import CompteModel from "../../models/offre.js";

export const getOffres = async (req, res) => {
  try {
    const offres = await OffreModel.find();
    if (!offres) {
      return res.status(400).send({ message: "Pas d'offres" });
    }

    res.status(200).json(offres);
  } catch (erreur) {
    console.log("ERROR controller/api/offres.js getOffres() : " + erreur);
    return res.status(500).json("Erreur interne");
  }
};

export const getOffre = async (req, res) => {
  try {
    const offre = await OffreModel.findOne({ id: req.params.id });

    if (!offre) {
      return res.status(400).send({ message: "Aucune offre trouvée" });
    }

    var binary = offre.binaire;
    res.contentType("pdf");
    res.end(binary, "binary");
  } catch (erreur) {
    console.log("ERROR controller/api/offres.js getOffre() : " + erreur);
    return res.status(400).json({ message: "Erreur interne" });
  }
};

export const createOffre = async (req, res) => {
  try {
    if (!validator.isAlphanumeric(req.headers.nom_poste, "fr-FR", { ignore: "'() -/,&[]@:." })) new Error("Le nom du poste contient des caracteres non valides");
    if (!validator.isAlphanumeric(req.headers.nom_entreprise, "fr-FR", { ignore: "'() -/,&[]@:.!?" })) new Error("Le nom de l'entreprise contient des caracteres non valides");
    if (!validator.isAlphanumeric(req.headers.lieu_poste, "fr-FR", { ignore: "'() -/,&[]" })) new Error("Le nom du lieu contient des caracteres non valides");
  } catch (erreur) {
    console.log("ERROR controller/api/offres.js createOffre() : " + erreur);
    return res.status(400).json(erreur.message);
  }

  try {
    if (req.compte.statut == "Administrateur") {
      await OffreModel.create({ id_entreprise: "Administrateur", binaire: req.body, nom_entreprise: req.headers.nom_entreprise, description: req.headers.description_poste, formation: req.headers.formation_poste, nom_poste: req.headers.nom_poste, lieu_poste: req.headers.lieu_poste, estValide: true });
      return res.status(200).json({ message: "L'offre a bien été envoyée" });
    } else {
      await OffreModel.create({ id_entreprise: req.compte.id, binaire: req.body, nom_entreprise: req.headers.nom_entreprise, description: req.headers.description_poste, formation: req.headers.formation_poste, nom_poste: req.headers.nom_poste, lieu_poste: req.headers.lieu_poste });
      return res.status(200).json({ alert: true, message: "L'offre a bien été envoyée, elle va être validée ou non par un administrateur." });
    }
  } catch (erreur) {
    console.log("ERROR controller/api/offres.js createOffre() : " + erreur);
    return res.status(500).json("Erreur interne");
  }
};

export const updateOffre = async (req, res) => {
  try {
    const offre = await OffreModel.findById(req.compte.id);
    if (!offre) {
      return res.status(400).json({ message: "Pas d'offre trouvée" });
    }
    res.status(200).json({ success: true });
  } catch (erreur) {
    console.log("ERROR controller/api/offres.js updateOffre() : " + erreur);
    return res.status(500).json("Erreur interne");
  }
};

export const updateAnyOffre = async (req, res) => {
  try {
    const offre = await OffreModel.findById(req.params.id);
    if (!offre) {
      return res.status(400).json({ message: "Pas d'offre trouvée" });
    }
    res.status(200).json({ success: true });
  } catch (erreur) {
    console.log("ERROR controller/api/offres.js updateAnyOffre() : " + erreur);
    return res.status(500).json("Erreur interne");
  }
};

export const deleteOffre = async (req, res) => {
  try {
    const offre = await OffreModel.findById({ _id: req.params.id });

    if (!offre) throw Error("Pas d'offre trouvée");
    if (req.compte.statut === "Entreprise") {
      if (offre.id_entreprise == req.compte.id) {
        const removed = await offre.remove();
        if (!removed) throw Error("Quelque chose s'est mal passé en essayant de supprimer l'offre.");
      } else {
        return res.status(400).json({ message: "Vous n'êtes pas autorisé a supprimer cette offre." })
      }
    } else {
      const removed = await offre.remove();
      if (!removed) throw Error("Quelque chose s'est mal passé en essayant de supprimer l'offre.");
    }

    return res.status(200).json({ success: true });
  } catch (erreur) {
    console.log("ERROR controller/api/offres.js deleteOffre() : " + erreur);
    return res.status(500).json("Erreur interne");
  }
};

export const validateOffre = async (req, res) => {
  try {
    const test = await OffreModel.updateOne({ id: req.body.id }, { $set: { estValide: true } });
    return res.status(200).json({ message: "L'offre a été validée." });
  } catch (erreur) {
    console.log("ERROR controller/api/offres.js validateOffre() : " + erreur);
    return res.status(500).json({ message: "Erreur interne" });
  }
};
