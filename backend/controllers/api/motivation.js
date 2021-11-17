import MotivationModel from "../../models/motivation.js";
import CompteModel from "../../models/compte.js";

export const postMotivation = async (req, res) => {
  var binaire = req.body;
  var id_eleve = req.compte.id;
  var email = req.compte.email;
  var formation = req.compte.statut;

  // Check if the user has a account in the DB
  try {
    const mongoCompte = await CompteModel.findOne({ email });

    if (!mongoCompte) {
      return res.status(400).json({ message: "Aucun compte trouvé." });
    }

    const motivation = await MotivationModel.findOne({ id_eleve });
    if (motivation) {
      await MotivationModel.updateOne({ id_eleve: id_eleve }, { $set: { binaire: binaire } });
    } else {
      await MotivationModel.create({ binaire: binaire, id_eleve: id_eleve, formation: formation });
    }

    res.status(200).json({ message: "La lettre de motivation a bien été envoyée." });
  } catch (erreur) {
    console.log(erreur);
    res.status(500).json({ message: "Erreur interne." });
  }
};

export const getMotivation = async (req, res) => {
  console.log("CV MOTIVATION.JS : REQUEST Unique CV");
  var id_user = req.compte.id;
  var email = req.compte.email;

  try {
    const mongoCompte = await MotivationModel.findOne({ email });

    if (!mongoCompte) {
      return res.status(400).json({ message: "Aucun compte trouvé." });
    }

    const pdfBinary = await MotivationModel.findOne({ id_user });

    if (!pdfBinary) {
      return res.status(400).json({ message: "Pas de CV trouvé." });
    }
    //console.log("CV API.JS : "+ pdfBinary)
    var username = mongoCompte._id;
    var binary = pdfBinary.binaire;
    //console.log(binary)
    res.contentType("pdf");
    res.end(binary, "binary");
  } catch (erreur) {
    console.log(erreur);
    res.erreur(404).json({ message: "Erreur interne." });
  }
};
