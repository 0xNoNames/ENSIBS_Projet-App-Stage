import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CompteModel from "../models/compte.js";

dotenv.config({ path: "backend/.env" });

export const verifierToken = async (req, res, next) => {
  var cookieToken;
  var decodedToken;

  try {
    try {
      var cookies = req.headers.cookie.split(";");
      cookies.forEach((cookie) => {
        let parts = cookie.split("=");
        if ((parts[0] = "token")) {
          cookieToken = { nom: parts[0], token: parts[1] };
        }
      });
    } catch (error) {
      req.estConnecte = false;
      req.utilisateur = "";
      console.log("Pas de cookies.");
      return next();
    }

    /* On vérifie que le JWT est présent dans les cookies de la requête */
    if (cookieToken.nom != "token" || cookieToken.token == "") {
      req.estConnecte = false;
      req.utilisateur = "";
      console.error("Pas de token.");
      return next();
    }

    /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
    try {
      decodedToken = jwt.verify(cookieToken.token, process.env.JWT_SECRET);
    } catch (error) {
      req.estConnecte = false;
      req.utilisateur = "";
      console.log("Token malformé.");
      return next();
    }

    /* On vérifie que l'utilisateur existe bien dans notre base de données */
    const utilisateur = await CompteModel.findOne({ _id: decodedToken.id });
    if (!utilisateur) {
      req.estConnecte = false;
      req.utilisateur = "";
      console.error("Pas d'utilisateur.");
      return next();
    }

    req.utilisateur = utilisateur;
    req.estConnecte = true;

    return next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erreur interne." });
  }
};

export const estValide = (req, res, next) => {
  if (req.estConnecte === false || req.user === "") {
    return res.render("pages/erreur401", {
      estConnecte: false,
      page: "Erreur 401",
      prenom: "",
    });
  } else {
    console.error("Pas valide.");
  }
  return next();
};

export const estVerifie = (req, res, next) => {
  if (req.utilisateur.role == "verification") {
    return res.render("pages/erreurVerif", {
      estConnecte: false,
      page: "Erreur",
      prenom: req.utilisateur.prenom,
    });
  } else {
    console.error("Pas vérifié.");
  }
  return next();
};

export const estAdministrateur = (req, res, next) => {
  if (req.utilisateur != "administrateur") {
    return res.render("pages/erreur401", {
      estConnecte: false,
      page: "Erreur 401",
      prenom: req.utilisateur.prenom,
    });
  } else {
    console.error("Pas administrateur.");
  }
  return next();
};

export const estEntreprise = (req, res, next) => {
  console.log(req.user);
  return next();
};

export const estEtudiant = (req, res, next) => {
  console.log(req.user);
  return next();
};

export default {
  verifierToken,
  estAdministrateur,
  estEntreprise,
  estEtudiant,
  estValide,
  estVerifie,
};
