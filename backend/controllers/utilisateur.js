import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UtilisateurModel from "../models/utilisateur.js";

dotenv.config({ path: "backend/.env" });

export const getUtilisateurs = async (req, res) => {
  try {
    const Utilisateurs = await UtilisateurModel.find();
    res.status(200).json(Utilisateurs);
  } catch (error) {
    res.error(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
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
  console.log(req.body);
  const { email, mot_de_passe } = req.body;

  // Simple validation
  if (!email || !mot_de_passe) return res.status(400).json({ msg: "Remplissez tous les champs." });

  try {
    const bddUtilisateur = await UtilisateurModel.findOne({ email });

    if (!bddUtilisateur) return res.status(400).json({ message: "Email ou mot de passe invalide." });

    const verifMotDePasse = await bcrypt.compare(mot_de_passe, bddUtilisateur.mot_de_passe);

    if (!verifMotDePasse) return res.status(400).json({ message: "Email ou mot de passe invalide." });

    const token = jwt.sign({ email: bddUtilisateur.email, id: bddUtilisateur._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    if (!token) return res.status(400).json({ message: "Impossible de signer le token." });

    res.status(200).json({ result: bddUtilisateur, token });
  } catch (err) {
    res.status(500).json({ message: "Quelque chose n'a pas fonctionné." });
  }
};

export const inscription = async (req, res) => {
  const { email, mot_de_passe, nom, prenom } = req.body;

  try {
    const bddUtilisateur = await Utilisateur.findOne({ email });

    if (bddUtilisateur) return res.status(400).json({ message: "Email déjà utilisé." });

    const hashMotDePasse = await bcrypt.hash(mot_de_passe, 12);

    const result = await UtilisateurModel.create({ email, mot_de_passe: hashMotDePasse, prenom, nom });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Quelque chose n'a pas fonctionné." });

    console.log(error);
  }
};

export const deconnexion = async (req, res) => {
  req.logout();
  res.redirect("/");
};
