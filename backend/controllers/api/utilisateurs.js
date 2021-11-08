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

export const deleteUtilisateur = (req, res) => {
  res.status(200);
};

export const deleteAnyUtilisateur = (req, res) => {
  res.status(200);
};
