import CVModel from "../../models/cv.js";
import CompteModel from "../../models/compte.js";

export const getCVs = async (req, res) => {
  try {
    const Cvs = await CVModel.find();
    res.status(200).json(Cvs);
  } catch (erreur) {
    res.erreur(404).json({ message: "Erreur interne." });
  }
};

export const createCV = async (req, res) => {
  console.log("CV API.JS : upload Unique CV");
  var binaire = req.body;
  var id_eleve = req.compte.id;
  var email = req.compte.email;
  var formation = req.compte.statut;
  //New fields
  //var linkedin = req.body.linkedin;
  //var description = req.body.description;

  try {
    const mongoCompte = await CompteModel.findOne({ id_eleve });

    if (!mongoCompte) {
      return res.status(400).json({ message: "Aucun compte trouvé." });
    }

    const cv = await CVModel.findOne({ id_eleve });

    if (cv) {
      await CVModel.updateOne({ id_eleve: id_eleve }, { $set: { binaire: binaire } });
    } else {
      await CVModel.create({ binaire, id_eleve: id_eleve, formation: formation });
      console.log("CREATING  CVS : " + id_eleve);
    }
    res.status(200).json({ message: "Le CV a bien été envoyée." });
  } catch (erreur) {
    console.log(erreur);
    res.erreur(500).json({ message: "Erreur interne." });
  }
};

export const getCV = async (req, res) => {
  console.log("CV API.JS : REQUEST Unique CV");
  var id_user = req.compte.id;
  var email = req.compte.email;
  
  try {
    const mongoCompte = await CompteModel.findOne({ email });

    if (!mongoCompte) {
      return res.status(400).json({ message: "Aucun compte trouvé." });
    }

    const pdfBinary = await CVModel.findOne({ id_user });

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

export const updateCV = (req, res) => {
  res.status(200);
};

export const deleteCV = (req, res) => {
  res.status(200);
};

export const deleteAnyCV = (req, res) => {
  res.status(200);
};
