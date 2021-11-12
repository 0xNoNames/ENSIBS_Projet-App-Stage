import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import CompteModel from "../models/compte.js";

dotenv.config({ path: "backend/.env" });

export const verifierToken = async (req, res, next) => {
  var cookieToken = { nom: "", token: "" };
  var decodedToken;


  try {
    try {
      var cookies = req.headers.cookie.split(";");
      console.log(cookies)
      cookies.forEach((cookie) => {
        let parts = cookie.split("=");
        if (parts[0].replace(/\s+/g, "") == "token") {
          cookieToken = { nom: parts[0].replace(/\s+/g, ""), token: parts[1].replace(/\s+/g, "") };
        }
      });
    } catch (error) {
      req.estConnecte = false;
      req.compte = "";
      console.error("AUTH.JS : Pas de cookies.", error);
      return next();
    }
    console.log(cookieToken)
    /* On vérifie que le JWT est présent dans les cookies de la requête */
    if (cookieToken.nom != "token" || cookieToken.token == "") {
      req.estConnecte = false;
      req.compte = "";
      console.error("AUTH.JS : Pas de token.");
      return next();
    }

    /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
    try {
      console.log(cookieToken.token)
      decodedToken = jwt.verify(cookieToken.token, process.env.JWT_SECRET);

    } catch (error) {
      req.estConnecte = false;
      req.compte = "";
      console.error("AUTH.JS : Token malformé.");
      return next();
    }

    /* On vérifie que l'compte existe bien dans notre base de données */
    const compte = await CompteModel.findOne({ _id: decodedToken.id });
    if (!compte) {
      req.estConnecte = false;
      req.compte = "";
      console.error("AUTH.JS : Pas d'compte.");
      return next();
    }

    req.compte = compte;
    req.estConnecte = true;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur interne." });
  }
};

export const estVerifie = (req, res, next) => {
  if (req.compte.estVerifie === false || req.estConnecte === false) {
    console.error("AUTH.JS : Pas vérifié.");
    return res.render("pages/erreur401", {
      estConnecte: false,
      page: "Erreur 401",
      prenom: "",
    });
  }
  return next();
};

export const estAdministrateur = (req, res, next) => {
  if (req.estConnecte === false || req.compte.estAttribue === false || req.compte === "" || req.compte.statut != "administrateur") {
    console.error("AUTH.JS : Statut administrateur nécéssaire.");
    return res.render("pages/erreur401", {
      estConnecte: true,
      page: "Erreur 401",
      prenom: req.compte.prenom,
    });
  }
  return next();
};

export const estEntreprise = (req, res, next) => {
  if (req.estConnecte === false || req.compte.estAttribue === false || req.compte === "" || req.compte.statut != "entreprise") {
    console.error("AUTH.JS : Statut entreprise nécéssaire.");
    return res.render("pages/erreur401", {
      estConnecte: true,
      page: "Erreur 401",
      prenom: req.compte.prenom,
    });
  }
  return next();
};

export const estEtudiant = (req, res, next) => {
  if (req.estConnecte === false || req.compte.estAttribue === false || req.compte === "" || req.compte.statut != "etudiant") {
    console.error("AUTH.JS : Statut étudiant nécéssaire.");
    return res.render("pages/erreur401", {
      estConnecte: true,
      page: "Erreur 401",
      prenom: req.compte.prenom,
    });
  }
  return next();
};

export default {
  verifierToken,
  estVerifie,
  estAdministrateur,
  estEntreprise,
  estEtudiant,
};
