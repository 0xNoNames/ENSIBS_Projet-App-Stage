import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

import UtilisateurModel from "../models/utilisateur.js";
import RefreshTokenModel from "../models/refreshToken.js";

dotenv.config({ path: "../.env" });

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
  const { email, mot_de_passe } = req.body;

  // Simple validation
  if (!email || !mot_de_passe) return res.status(400).json({ msg: "Remplissez tous les champs." });

  try {
    const bddUtilisateur = await UtilisateurModel.findOne({ email });

    if (!bddUtilisateur) return res.status(400).json({ message: "Email ou mot de passe invalide." });

    const verifMotDePasse = await bcrypt.compare(mot_de_passe, bddUtilisateur.mot_de_passe);

    if (!verifMotDePasse) return res.status(400).json({ message: "Email ou mot de passe invalide." });

    /* On créer le token CSRF */
    const xsrfToken = crypto.randomBytes(64).toString("hex");

    /* On créer le JWT avec le token CSRF dans le payload */
    const accessToken = jwt.sign({ prenom: bddUtilisateur.prenom, nom: bddUtilisateur.nom, xsrfToken }, process.env.JWT_SECRET, { expiresIn: process.env.accessTokenExpiresIn });

    if (!accessToken) return res.status(400).json({ message: "Impossible de signer le token." });

    /* On créer le refresh token et on le stocke en BDD */
    const refreshToken = crypto.randomBytes(128).toString("base64");

    await RefreshTokenModel.create({
      userId: bddUtilisateur.id,
      token: refreshToken,
      expiresAt: Date.now() + parseInt(process.env.refreshTokenExpiresIn),
    });

    /* On créer le cookie contenant le JWT */
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(process.env.accessTokenExpiresIn),
    });

    /* On créer le cookie contenant le refresh token */
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: process.env.refreshTokenExpiresIn,
      path: "/token",
    });

    /* On envoie une reponse JSON contenant les durées de vie des tokens et le token CSRF */
    res.status(200).json({
      accessTokenExpiresIn: process.env.accessTokenExpiresIn,
      refreshTokenExpiresIn: process.env.refreshTokenExpiresIn,
      xsrfToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.toString });
  }
};

export const inscription = async (req, res) => {
  const { email, mot_de_passe, nom, prenom } = req.body;

  // Simple validation
  if (!email || !mot_de_passe || !nom || !prenom) return res.status(400).json({ msg: "Remplissez tous les champs." });

  try {
    const bddUtilisateur = await UtilisateurModel.findOne({ email });

    if (bddUtilisateur) return res.status(400).json({ message: "L'email est utilisé." });

    if (mot_de_passe < 8) return res.status(400).json({ message: "Le mot de passe doit faire minimum 8 caractères." });

    let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

    if (!passRegex.test(mot_de_passe)) return res.status(400).json({ message: "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial." });

    const hash = await bcrypt.hash(mot_de_passe, 12);

    const result = await UtilisateurModel.create({ email, mot_de_passe: hash, prenom, nom });

    const xsrfToken = crypto.randomBytes(64).toString("hex");

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Quelque chose n'a pas fonctionné." });

    console.log(error);
  }
};

export const deconnexion = async (req, res) => {
  req.logout();
};
