import dotenv from "dotenv";
import UtilisateurModel from "../../models/utilisateur.js";

dotenv.config({ path: "../.env" });

export const getUtilisateurs = async (req, res) => {
  try {
    const Utilisateurs = await UtilisateurModel.find();
    res.status(200).json(Utilisateurs);
  } catch (error) {
    res.error(404).json({ message: error.message });
  }
};

export const createUtilisateur = (req, res) => {
  res.status(200);
};

export const updateUtilisateur = (req, res) => {
  res.status(200);
};

export const deleteUtilisateur = async (req, res) => {
  const id = req.utilisateur.id;
  try {
    const supp = await UtilisateurModel.deleteOne({_id : id});
    console.log(supp);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnyUtilisateur = (req, res) => {
  res.status(200);
};
