import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UtilisateurModel from "../models/utilisateur.js";

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

export const connexion = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  try {
    const bddUtilisateur = await UtilisateurModel.findOne({ email });

    if (!bddUtilisateur)
      return res
        .status(404)
        .json({ message: "Email ou mot de passe invalide." });

    const verificationMotDePasse = await bcrypt.compare(
      mot_de_passe,
      bddUtilisateur.mot_de_passe
    );

    if (!verificationMotDePasse)
      return res
        .status(400)
        .json({ message: "Email ou mot de passe invalide." });

    const token = jwt.sign(
      { email: bddUtilisateur.email, id: bddUtilisateur._id },
      secret,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: bddUtilisateur, token });
  } catch (err) {
    res.status(500).json({ message: "Quelque chose n'a pas fonctionné." });
  }
};
export const inscription = async (req, res) => {
  const { email, mot_de_passe, nom, prenom } = req.body;

  try {
    const bddUtilisateur = await Utilisateur.findOne({ email });

    if (bddUtilisateur)
      return res.status(400).json({ message: "Email déjà utilisé." });

    const hashMotDePasse = await bcrypt.hash(mot_de_passe, 12);

    const result = await UtilisateurModel.create({
      email,
      mot_de_passe: hashMotDePasse,
      prenom,
      nom,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Quelque chose n'a pas fonctionné." });

    console.log(error);
  }
};
export const deconnexion = async (req, res) => {};
