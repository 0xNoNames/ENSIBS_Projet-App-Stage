import UtilisateurModel from "../../models/utilisateur.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

export const deleteDeconnexion = async (req, res) => {
  if (req.estConnecte) {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      maxAge: parseInt(process.env.jwtExpiresIn),
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
};

export const postConnexion = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) return res.status(400).json({ msg: "Remplissez tous les champs." });

  try {
    const bddUtilisateur = await UtilisateurModel.findOne({ email });

    if (!bddUtilisateur) return res.status(400).json({ message: "Email ou mot de passe invalide." });

    const verifMotDePasse = await bcrypt.compare(mot_de_passe, bddUtilisateur.mot_de_passe);

    if (!verifMotDePasse) return res.status(400).json({ message: "Email ou mot de passe invalide." });

    /* On créer le JWT */
    const token = jwt.sign({ id: bddUtilisateur.id }, process.env.JWT_SECRET, { expiresIn: process.env.jwtExpiresIn });

    if (!token) return res.status(400).json({ message: "Impossible de signer le token." });

    /* On créer le cookie contenant le JWT */
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(process.env.jwtExpiresIn),
    });
    res.status(201).json({ bddUtilisateur });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Quelque chose n'a pas fonctionné." });
  }
};

export const postInscription = async (req, res) => {
  const { email, mot_de_passe, nom, prenom } = req.body;

  if (!email || !mot_de_passe || !nom || !prenom) return res.status(400).json({ msg: "Remplissez tous les champs." });

  try {
    const bddUtilisateur = await UtilisateurModel.findOne({ email });

    if (bddUtilisateur) return res.status(400).json({ message: "L'email est utilisé." });

    if (mot_de_passe < 8) return res.status(400).json({ message: "Le mot de passe doit faire minimum 8 caractères." });

    let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

    if (!passRegex.test(mot_de_passe)) return res.status(400).json({ message: "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial." });

    const hash = await bcrypt.hash(mot_de_passe, 12);

    const result = await UtilisateurModel.create({ email, mot_de_passe: hash, prenom, nom });

    const token = jwt.sign({ id: result.id }, process.env.JWT_SECRET, { expiresIn: process.env.jwtExpiresIn });

    /* On créer le cookie contenant le JWT */
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(process.env.jwtExpiresIn),
    });
    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Quelque chose n'a pas fonctionné." });
  }
};
