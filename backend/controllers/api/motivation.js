import MotivationModel from "../../models/motivation.js";
import CompteModel from "../../models/compte.js";

export const postMotivation = async (req, res) => {
  var binaire = req.body.data_file;
  var id_eleve = req.compte.id;
  var email = req.compte.email;
  var formation = req.compte.statut;

  // Check if the user has a account in the DB
  try {
    const mongoCompte = await CompteModel.findOne({ email });

    if (!mongoCompte) {
      return res.status(400).json({ message: "Aucun compte trouvé." });
    }

    const motivation = await MotivationModel.find({ id_eleve });
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
