import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto, { createCipheriv } from "crypto";

import CompteModel from "../../models/compte.js";
import ValidationModel from "../../models/validation.js";
import envoyerMail from "../../../utils/envoyerMail.js";
import { captureRejections } from "events";

dotenv.config({ path: "../.env" });

export const getComptes = async (req, res) => {
  try {
    const Comptes = await ComptesModel.find();
    res.status(200).json(Comptes);
  } catch (erreur) {
    console.log("getComptes() from /controllers/api/comptes.js : ", erreur);
    res.erreur(404).json({ message: erreur.message });
  }
};

export const createCompte = async (req, res) => {
  if (req.estConnecte) {
    return res.redirect("/compte");
  }

  const { nom, prenom, email, mot_de_passe, statut } = req.body;

  if (!nom || !prenom || !email || !mot_de_passe || !statut) return res.status(400).json({ msg: "Remplissez tous les champs." });

  try {
    const mongoCompte = await CompteModel.findOne({ email });

    if (mongoCompte) return res.status(400).json({ message: "L'email est utilisé." });

    if (mot_de_passe < 8) return res.status(400).json({ message: "Le mot de passe doit faire minimum 8 caractères." });

    let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

    if (!passRegex.test(mot_de_passe)) return res.status(400).json({ message: "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial." });

    const hash = await bcrypt.hash(mot_de_passe, 12);

    const compte = await CompteModel.create({ nom, prenom, email, mot_de_passe: hash, statut });

    const validation = await ValidationModel.create({ _compteId: compte._id, token: crypto.randomBytes(16).toString("hex") });

    await envoyerMail(
      res,
      email,
      "Mail de vérification ENSIBS",
      "Bonjour MM./M. " + compte.nom + ",\n\n" + "Veuillez vérifier votre compte en cliquant sur le lien suivant : \nhttp://" + req.headers.host + "/api/comptes/valider/" + compte.id + "/" + validation.token + "\n\nMerci!\n"
    );

    res.status(200).send({
      message: "Un email de vérification vous a été envoyé, il expirera après un jour, si vous n'avez pas reçu l'email de vérification vérifiez vos spam ou cliquez ici : <a href='/compte/aide/' class='text-green-ensibs-light text-4xl'>AIDE</a>",
    });
  } catch (erreur) {
    console.log("createCompte() from /controllers/api/comptes.js : ", erreur);
    res.status(500).json({ message: "Erreur interne." });
  }
};

export const updateCompteMail = async (req, res) => {
  if (!req.estConnecte) {
    return res.redirect("/compte/connexion");
  }
  const nouveauEmail = req.body.email;
  const mongoCompte = await CompteModel.findOne({ email: nouveauEmail });
  if (mongoCompte) return res.status(400).json({ message: "L'email est utilisé." });
  if (nouveauEmail != "") {
    try {
      const test = await CompteModel.updateOne({ _id: req.compte.id }, { $set: { "email": nouveauEmail } })
    } catch (erreur) {
      console.log(erreur);
      res.status(500).json({ message: "Erreur interne." });
    }
    res.redirect("/compte");
  }
}

export const updateCompteMotDePasse = async (req, res) => {
  if (!req.estConnecte) {
    return res.redirect("/compte/connexion");
  }
  const nouveauMotDePasse = req.body.mot_de_passe;
  if (nouveauMotDePasse != "") {
    try {
      if (nouveauMotDePasse < 8) return res.status(400).json({ message: "Le mot de passe doit faire minimum 8 caractères." });
      let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");
      if (!passRegex.test(nouveauMotDePasse)) return res.status(400).json({ message: "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial." });
      const hash = await bcrypt.hash(nouveauMotDePasse, 12);
      await CompteModel.updateOne({_id : req.compte.id}, {$set : { "mot_de_passe" : hash}})
    } catch (erreur) {
      console.log(erreur);
      res.status(500).json({ message: "Erreur interne." });
    }
    res.sendStatus(200);
    res.redirect("/compte");
  }
}

export const deleteCompte = async (req, res) => {
  const id = req.compte.id;
  try {
    const supp = await CompteModel.deleteOne({ _id: id });
    res.sendStatus(200);
  } catch (erreur) {
    console.log("deleteCompte() from /controllers/api/comptes.js : ", erreur);
    res.status(500).json({ message: "Erreur interne." });
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
      maxAge: parseInt(process.env.JWT_EXPIRES_IN),
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
};

export const postConnexion = async (req, res) => {
  if (req.estConnecte) {
    return res.redirect("/compte");
  }

  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) return res.status(400).json({ msg: "Remplissez tous les champs." });

  try {
    const mongoCompte = await CompteModel.findOne({ email });

    if (!mongoCompte) return res.status(400).json({ message: "Email ou mot de passe invalide." });

    const verifMotDePasse = await bcrypt.compare(mot_de_passe, mongoCompte.mot_de_passe);

    if (!verifMotDePasse) return res.status(400).json({ message: "Email ou mot de passe invalide." });

    if (!mongoCompte.estVerifie) return res.status(400).json({ message: "Veuillez vérifier votre compte." });

    /* On créer le JWT */
    const token = jwt.sign({ id: mongoCompte.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    if (!token) return res.status(400).json({ message: "Impossible de signer le token." });

    /* On créer le cookie contenant le JWT */
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(process.env.JWT_EXPIRES_IN),
    });
    res.status(201).json({ mongoCompte });
  } catch (erreur) {
    console.log("postConnexion() from /controllers/api/comptes.js : ", erreur);
    res.status(500).json({ message: "Erreur interne." });
  }
};

export const getValiderCompte = async (req, res) => {
  try {
    const validation = await ValidationModel.findOne({ _compteId: req.params.id, token: req.params.token });
    if (!validation) {
      return res.status(400).send({ message: "Votre lien de vérification a peut-être expiré, veuillez cliquer sur le bouton suivant pour renvoyer l'e-mail de vérification :  <a href='/compte/aide/' class='text-white text-4xl'>AIDE</a>" });
    }
    const compte = await CompteModel.findOne({ _id: validation._compteId });

    if (!compte) {
      return res.status(400).send({ message: "Nous n'avons pas pu trouver de compte pour cette vérification, veuillez vous inscrire." });
    }

    if (compte.estVerifie) {
      return res.status(200).send({ message: "Le compte a déjà été vérifié, veuillez vous connecter." });
      await ValidationModel.findByIdAndRemove(validation._id);
    }

    await CompteModel.updateOne({ _id: compte._id, estVerifie: true });
    await ValidationModel.findByIdAndRemove(validation._id);
    return res.redirect("/compte/connexion"); //res.status(200).send({ message: "Votre compte a été vérifié avec succès." });
  } catch (erreur) {
    console.log("getValiderCompte() from /controllers/api/comptes.js : ", erreur);
    res.status(500).send({ message: "Erreur interne." });
  }
};

export const postAideValidation = async (req, res) => {
  const compte = await CompteModel.findOne({ email: req.body.email });

  if (!compte) {
    return res.status(400).send({ message: "Nous n'avons pas pu trouver de compte pour cette vérification, veuillez vous inscrire." });
  }

  if (compte.estVerifie) {
    return res.status(200).send({ message: "Le compte a déjà été vérifié, veuillez vous connecter." });
  }

  var validation = await ValidationModel.findOne({ _compteId: compte._id });

  if (validation) {
    await ValidationModel.findByIdAndRemove(validation._id);
  }

  validation = await ValidationModel.create({ _compteId: compte._id, token: crypto.randomBytes(16).toString("hex") });

  await envoyerMail(
    res,
    req.body.email,
    "Mail de vérification ENSIBS",
    "Bonjour MM./M. " + compte.nom + ",\n\n" + "Veuillez vérifier votre compte en cliquant sur le lien suivant : \nhttp://" + req.headers.host + "/api/comptes/valider/" + compte.id + "/" + validation.token + "\n\nMerci!\n"
  );

  res.status(200).send({
    message: "Un email de vérification vous a été envoyé, il expirera après un jour, si vous n'avez pas reçu l'email de vérification vérifiez vos spams.",
  });
};

export const postAideOublie = async (req, res) => {
  return res.status(200).send({
    message: "Un email de récupération vous a été envoyé, il expirera après un jour, si vous n'avez pas reçu l'email de vérification vérifiez vos spams.",
  });
};
