import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "../.env" });

export const getConnexionPage = (req, res) => {
  if (req.estConnecte) {
    res.redirect("/compte");
  } else {
    res.render("pages/connexion", {
      estConnecte: false,
      page: "",
    });
  }
};

export const getInscriptionPage = (req, res) => {
  if (req.estConnecte) {
    res.redirect("/compte");
  } else {
    res.render("pages/inscription", {
      estConnecte: false,
      page: "Inscription",
      prenom: req.utilisateur.prenom,
    });
  }
};

export const getComptePage = (req, res) => {
  res.render("pages/compte", {
    estConnecte: true,
    page: "Compte",
    prenom: req.utilisateur.prenom,
    nom : req.utilisateur.nom,
    email : req.utilisateur.email,
    role : req.utilisateur.role
  });
};
