import CompteModel from "../../models/compte.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../.env" });

export const getComptes = async (req, res) => {
  try {
    const Comptes = await ComptesModel.find();
    res.status(200).json(Comptes);
  } catch (error) {
    res.error(404).json({ message: error.message });
  }
};

export const createCompte = async (req, res) => {
  const { nom, prenom, email, mot_de_passe, statut } = req.body;

  if (!nom || !prenom || !email || !mot_de_passe || !statut) return res.status(400).json({ msg: "Remplissez tous les champs." });

  try {
    const bddCompte = await CompteModel.findOne({ email });

    if (bddCompte) return res.status(400).json({ message: "L'email est utilisé." });

    if (mot_de_passe < 8) return res.status(400).json({ message: "Le mot de passe doit faire minimum 8 caractères." });

    let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

    if (!passRegex.test(mot_de_passe)) return res.status(400).json({ message: "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial." });

    const hash = await bcrypt.hash(mot_de_passe, 12);

    const result = await CompteModel.create({ nom, prenom, email, mot_de_passe: hash, statut });

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

export const updateCompte = (req, res) => {
  res.status(200);
};

export const deleteCompte = async (req, res) => {
  const id = req.utilisateur.id;
  try {
    const supp = await CompteModel.deleteOne({ _id: id });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(400);
    console.log(error);
  }
};

export const deleteAnyCompte = (req, res) => {
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
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

export const postConnexion = async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) return res.status(400).json({ msg: "Remplissez tous les champs." });

  try {
    const bddCompte = await CompteModel.findOne({ email });

    if (!bddCompte) return res.status(400).json({ message: "Email ou mot de passe invalide." });

    const verifMotDePasse = await bcrypt.compare(mot_de_passe, bddCompte.mot_de_passe);

    if (!verifMotDePasse) return res.status(400).json({ message: "Email ou mot de passe invalide." });

    /* On créer le JWT */
    const token = jwt.sign({ id: bddCompte.id }, process.env.JWT_SECRET, { expiresIn: process.env.jwtExpiresIn });

    if (!token) return res.status(400).json({ message: "Impossible de signer le token." });

    /* On créer le cookie contenant le JWT */
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(process.env.jwtExpiresIn),
    });
    res.status(201).json({ bddCompte });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Quelque chose n'a pas fonctionné." });
  }
};
