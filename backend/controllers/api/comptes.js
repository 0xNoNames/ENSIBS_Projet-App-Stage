import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import validator from "validator";
import sanitizeMDB from "mongo-sanitize";

import CompteModel from "../../models/compte.js";
import CvModel from "../../models/cv.js";
import EntretienModel from "../../models/entretien.js";
import MotivationModel from "../../models/motivation.js";
import OffreModel from "../../models/offre.js";
import SoutenanceModel from "../../models/motivation.js";

import ValidationModel from "../../models/validation.js";
import envoyerMail from "../../../utils/envoyerMail.js";

dotenv.config({ path: "../.env" });

export const getComptes = async (req, res) => {
  try {
    const comptes = await CompteModel.find();
    res.status(200).json(comptes);
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #getcomptes() : ", erreur);
    res.erreur(404).json({ message: erreur.message });
  }
};

export const createCompte = async (req, res) => {
  if (req.estConnecte) {
    return res.redirect("/compte");
  }

  var { nom, prenom, email, mot_de_passe, statut } = req.body;

  if (!nom || !prenom || !email || !mot_de_passe || !statut) return res.status(400).json({ message: "Remplissez tous les champs." });

  try {
    try {
      if (!validator.isAlpha(nom, "fr-FR", { ignore: "-'" })) new Error("Le nom contient des caractères invalides");
      if (!validator.isAlpha(prenom, "fr-FR", { ignore: "-'" })) new Error("Le prénom contient des caractères invalides");
      if (!validator.isEmail(email)) new Error("L'email contient des caractères invalide ou est malformé");
    } catch (erreur) {
      console.error("ERROR backend/controllers/api/comptes.js #createCompte() : " + erreur);
      return res.status(400).json(erreur.message);
    }

    mot_de_passe = sanitizeMDB(mot_de_passe);

    const mongoCompte = await CompteModel.findOne({ email });

    if (mongoCompte) return res.status(400).json({ message: "L'email est utilisé." });

    if (mot_de_passe < 8) return res.status(400).json({ message: "Le mot de passe doit faire minimum 8 caractères." });

    const passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

    if (!passRegex.test(mot_de_passe)) return res.status(400).json({ message: "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffre et un caractère spécial." });

    const hash = await bcrypt.hash(mot_de_passe, 12);

    const compte = await CompteModel.create({ nom, prenom, email, mot_de_passe: hash, statut });

    const validation = await ValidationModel.create({ _compteId: compte._id, token: crypto.randomBytes(16).toString("hex") });

    await envoyerMail(email, "Mail de vérification - ENSIBS", "Bonjour MM./M. " + compte.nom + ",<br><br>" + "Veuillez vérifier votre compte en cliquant sur le lien suivant : <br>http://" + req.headers.host + "/api/comptes/valider/" + compte.id + "/" + validation.token + "<br><br>Cordialement.<br>");

    res.status(200).send({ alert: true, message: "Un email de vérification vous a été envoyé, il expirera après un jour. Si vous n'avez pas reçu l'email de vérification, vérifiez vos spam ou aller sur la page d'AIDE." });
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #createCompte() : ", erreur);
    res.status(500).json({ message: "Erreur interne." });
  }
};

export const updateCompteMail = async (req, res) => {
  if (!req.estConnecte) {
    return res.status(400).json({ message: "Vous n'êtes pas connecté." });
  }
  const nouveauEmail = req.body.email;

  try {
    if (!validator.isEmail(nouveauEmail) || nouveauEmail == "") new Error("L'email contient des caractères invalide ou est malformé");
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #updateCompteMail() : " + erreur);
    return res.status(400).json(erreur.message);
  }

  const mongoCompte = await CompteModel.findOne({ email: nouveauEmail });
  if (mongoCompte) return res.status(400).json({ message: "L'email est utilisé." });

  try {
    await CompteModel.updateOne({ _id: req.compte.id }, { $set: { email: nouveauEmail, estVerifie: false } });

    var validation = await ValidationModel.findOne({ _compteId: req.compte._id });

    if (validation) {
      await ValidationModel.findByIdAndRemove(validation._id);
    }

    validation = await ValidationModel.create({ _compteId: req.compte._id, token: crypto.randomBytes(16).toString("hex") });

    await envoyerMail(nouveauEmail, "Mail de vérification - ENSIBS", "Bonjour MM./M. " + req.compte.nom + ",<br><br>" + "Veuillez vérifier votre compte en cliquant sur le lien suivant : <br>http://" + req.headers.host + "/api/comptes/valider/" + req.compte.id + "/" + validation.token + "<br><br>Cordialement.<br>");

    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      maxAge: parseInt(process.env.JWT_EXPIRES_IN),
    });
    res.status(200).send({ alert: true, message: "Veuillez vérifier votre compte via l'email de vérification qui vous a été envoyé, il expirera après un jour. Si vous n'avez pas reçu l'email de vérification, vérifiez vos spam ou aller sur la page d'AIDE." });
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #updateCompteMail() : ", erreur);
    res.status(500).json({ message: "Erreur interne." });
  }
};

export const updateCompteMotDePasse = async (req, res) => {
  if (!req.estConnecte) {
    return res.status(400).json({ message: "Vous n'êtes pas connecté." });
  }

  try {
    const ancienMDP = sanitizeMDB(req.body.ancienMDP);
    const nouveauMDP = sanitizeMDB(req.body.nouveauMDP);

    const mongoCompte = await CompteModel.findOne({ _id: req.compte.id });

    if (!mongoCompte) return res.status(400).json({ message: "Pas de compte, veuillez vous reconnecter." });

    const verifMotDePasse = await bcrypt.compare(ancienMDP, mongoCompte.mot_de_passe);

    if (!verifMotDePasse) return res.status(400).json({ message: "Mauvais mot de passe." });

    if (nouveauMDP < 8) return res.status(400).json({ message: "Le mot de passe doit faire minimum 8 caractères." });

    let passRegex = new RegExp("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])");

    if (!passRegex.test(nouveauMDP)) return res.status(400).json({ message: "Le mot de passe doit contenir au moins une miniscule, une majuscule, un chiffres et un caractère spécial." });

    const hash = await bcrypt.hash(nouveauMDP, 12);

    await CompteModel.updateOne({ _id: req.compte.id }, { $set: { mot_de_passe: hash } });

    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      maxAge: parseInt(process.env.JWT_EXPIRES_IN),
    });
    res.status(200).send({ alert: true, message: "Votre mot de passe a bien été modifié, veuillez vous reconnecter." });
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #updateCompteMotDePasse() : ", erreur);
    res.status(500).json({ message: "Erreur interne." });
  }
};

export const deleteCompte = async (req, res) => {
  const id = req.compte.id;
  try {
    await CompteModel.deleteOne({ _id: id });
    await CvModel.deleteOne({ id_eleve: id });
    await EntretienModel.deleteOne({ id_organisateur: id });
    await OffreModel.deleteOne({ id_entreprise: id });
    await MotivationModel.deleteOne({ id_eleve: id });
    await SoutenanceModel.deleteOne({ id_organisateur: id });

    try {
      if (!validator.isEmail(req.params.email) || req.params.email == "") new Error("L'email contient des caractères invalide ou est malformé");
    } catch (erreur) {
      console.error("ERROR backend/controllers/api/comptes.js #deleteCompte() : " + erreur);
      return res.status(400).json(erreur.message);
    }

    await envoyerMail(req.params.email, "Votre compte a été supprimé par un administrateur - ENSIBS", "Bonjour,<br><br>Votre compte a été supprimé par un administrateur, veuillez recréer un compte ou contacter un administrateur via le formulaire de contact du site.<br><br>Cordialement.<br>");

    res.sendStatus(200);
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #deleteCompte() : ", erreur);
    res.status(500).json({ message: "Erreur interne." });
  }
};

export const deleteAnyCompte = async (req, res) => {
  try {
    try {
      if (!validator.isEmail(req.params.email) || req.params.email == "") new Error("L'email contient des caractères invalide ou est malformé");
    } catch (erreur) {
      console.error("ERROR backend/controllers/api/comptes.js #deleteAnyCompte() : " + erreur);
      return res.status(400).json(erreur.message);
    }

    await CompteModel.deleteOne({ email: req.params.email });
    await envoyerMail(req.params.email, "Votre compte a bien été supprimé - ENSIBS", "Bonjour,<br><br>Vous avez supprimé votre compte, veuillez recréer un compte ou contacter un administrateur via le formulaire de contact du site s'il s'agit d'une erreur.<br><br>Cordialement.<br>");
    res.status(200).send({ message: "OK" });
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #deleteAnyCompte() : ", erreur);
    res.status(500).send({ message: "Erreur interne." });
  }
};

export const attribuerCompte = async (req, res) => {
  try {

    try {
      if (!validator.isEmail(req.params.email) || req.params.email == "") new Error("L'email contient des caractères invalide ou est malformé");
    } catch (erreur) {
      console.error("ERROR backend/controllers/api/comptes.js #attribuerCompte() : " + erreur);
      return res.status(400).json(erreur.message);
    }

    await CompteModel.updateOne({ email: req.params.email }, { $set: { estAttribue: true } });
    await envoyerMail(req.params.email, "Votre compte a été validé - ENSIBS", "Bonjour,<br><br>Votre compte a été validé par un administrateur, connectez-vous pour ajouter votre CV via la page Compte.<br><br>Cordialement.<br>");
    res.status(200).send({ message: "OK" });
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #attribuerCompte(): ", erreur);
    res.status(500).send({ message: "Erreur interne." });
  }
};

export const getAttribuerComptes = async (req, res) => {
  try {
    const comptesAttribuer = await CompteModel.find({ estAttribue: false, estVerifie: true });
    res.status(200).json(comptesAttribuer);
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #getAttribuerCompte() : ", erreur);
    res.status(500).send({ message: "Erreur interne." });
  }
};

export const deleteCompteDeconnexion = async (req, res) => {
  if (req.estConnecte) {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
      maxAge: parseInt(process.env.JWT_EXPIRES_IN),
    });
    res.sendStatus(200);
  } else {
    console.error("ERROR backend/controllers/api/comptes.js #deleteCompteDeconnexion()");
    res.sendStatus(400);
  }
};

export const postCompteConnexion = async (req, res) => {
  if (req.estConnecte)
    return res.redirect("/compte");

  const { email, mot_de_passe } = req.body;


  if (!email || !mot_de_passe) return res.status(400).json({ message: "Remplissez tous les champs" });

  try {
    if (!validator.isEmail(email)) new Error("L'email contient des caractères invalide ou est malformé");
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #postCompteConnexion() : " + erreur);
    return res.status(400).json(erreur.message);
  }

  mot_de_passe = sanitizeMDB(mot_de_passe);

  try {
    const mongoCompte = await CompteModel.findOne({ email });

    if (!mongoCompte) return res.status(400).json({ message: "Email ou mot de passe invalide" });

    const verifMotDePasse = await bcrypt.compare(mot_de_passe, mongoCompte.mot_de_passe);

    if (!verifMotDePasse) return res.status(400).json({ message: "Email ou mot de passe invalide" });

    if (!mongoCompte.estVerifie) return res.status(400).json({ message: "Veuillez vérifier votre compte" });

    /* On créer le JWT */
    const token = jwt.sign({ id: mongoCompte.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    if (!token) return res.status(400).json({ message: "Impossible de signer le token." });

    /* On créer le cookie contenant le JWT */
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(process.env.JWT_EXPIRES_IN),
    });
    res.status(200).json({ message: "OK" });
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #postConnexion() : ", erreur);
    res.status(500).json({ message: "Erreur interne." });
  }
};

export const getCompteValider = async (req, res) => {
  try {

    try {
      if (!validator.isAlphanumeric(req.params.id, "fr-FR", { ignore: "'() -/,&[]@:." })) new Error("L'id contient des caractères invalides");
      if (!validator.isAlphanumeric(req.params.token, "fr-FR", { ignore: "'() -/,&[]@:." })) new Error("Le token contient des caractères invalides");
    } catch (erreur) {
      console.error("ERROR backend/controllers/api/comptes.js #getCompteValider() : " + erreur);
      return res.status(400).json(erreur.message);
    }

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

    await CompteModel.updateOne({ _id: compte._id }, { $set: { estVerifie: true } });
    await ValidationModel.findByIdAndRemove(validation._id);
    return res.redirect("/compte/connexion");
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #getValiderCompte() : ", erreur);
    res.status(500).send({ message: "Erreur interne." });
  }
};

export const postCompteAideValidation = async (req, res) => {

  try {
    if (!validator.isEmail(req.body.email)) new Error("L'email contient des caractères invalides");
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/offres.js #postCompteAideValidation() : " + erreur);
    return res.status(400).json(erreur.message);
  }

  const compte = await CompteModel.findOne({ email: req.body.email });

  if (!compte) {
    return res.status(400).send({ status: false, message: "Nous n'avons pas pu trouver de compte pour cette vérification, veuillez vous inscrire." });
  }

  if (compte.estVerifie) {
    return res.status(200).send({ status: true, message: "Le compte a déjà été vérifié, veuillez vous connecter." });
  }

  var validation = await ValidationModel.findOne({ _compteId: compte._id });

  if (validation) {
    await ValidationModel.findByIdAndRemove(validation._id);
  }

  validation = await ValidationModel.create({ _compteId: compte._id, token: crypto.randomBytes(16).toString("hex") });

  await envoyerMail(req.body.email, "Mail de vérification ENSIBS", "Bonjour MM./M. " + compte.nom + ",<br><br>" + "Veuillez vérifier votre compte en cliquant sur le lien suivant : <br>http://" + req.headers.host + "/api/comptes/valider/" + compte.id + "/" + validation.token + "<br><br>Cordialement,<br>");

  res.status(200).send({
    status: true,
    message: "Un email de vérification vous a été envoyé, il expirera après un jour, si vous n'avez pas reçu l'email de vérification vérifiez vos spams.",
  });
};

export const postCompteAideOublie = async (req, res) => {
  return res.status(200).send({
    status: true,
    message: "Un email de récupération vous a été envoyé, il expirera après un jour, si vous n'avez pas reçu l'email de vérification vérifiez vos spams.",
  });
};

export const updateLinkedin = async (req, res) => {
  var json = JSON.parse(req.body);
  try {
    if (!validator.isEmail(req.compte.email)) new Error("L'email contient des caractères invalide ou est malformé");
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #updateCompteLinkedin() : ", erreur);
    res.status(500).json({ message: erreur.message });
  }

  try {
    const mongoCompte = await CompteModel.findOne({ email: req.compte.email });
    if (!mongoCompte) new Error("Aucun compte trouvé");
    await CompteModel.updateOne({ _id: req.compte.id }, { push: { off: json.linkedin } });
    res.status(200).send({ alert: true, message: "Votre lien LinkedIn a bien été modifié." });
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #updateCompteLinkedin() : ", erreur);
    res.status(500).json({ message: erreur.message });
  }
};

export const postSauvegardeOffre = async (req, res) => {
  var id_offre = req.body.id;

  try {
    if (!validator.isAlphanumeric(id_offre, "fr-FR", { ignore: "'() -/,&[]@:." })) new Error("L'id contient des caractères invalides");
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #updateCompteLinkedin() : ", erreur);
    res.status(500).json({ message: erreur.message });
  }

  try {
    await CompteModel.updateOne({ _id: req.compte.id }, { $set: { offres_sauvegardees: id_offre } });
    res.status(200).send({ alert: true, message: "L'offre a bien été sauvegardé." });
  } catch (erreur) {
    console.error("ERROR backend/controllers/api/comptes.js #updateCompteLinkedin() : ", erreur);
    res.status(500).json({ message: "Erreur interne." });
  }
};
