import dotenv from "dotenv";
import CompteModel from "../../models/compte.js";

dotenv.config({ path: "../.env" });

export const getConnexionPage = (req, res) => {
  if (req.estConnecte) {
    res.redirect("/compte");
  } else {
    res.render("pages/connexion", {
      estConnecte: false,
      page: "",
      statut: "",
      estAttribue: false,
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
      prenom: req.compte.prenom,
      statut: req.compte.statut,
      estAttribue: req.compte.estAttribue,
    });
  }
};

export const getComptePage = async (req, res) => {
  if (req.compte.statut == "Administrateur") {
    var comptesAttribuer = await CompteModel.find({ estAttribue: false, estVerifie: true });
    res.render("pages/compte", {
      estConnecte: true,
      page: "Aide",
      prenom: req.compte.prenom,
      nom: req.compte.nom,
      email: req.compte.email,
      statut: req.compte.statut,
      estAttribue: req.compte.estAttribue,
      comptes: comptesAttribuer,
    });
  } else {
    res.render("pages/compte", {
      estConnecte: true,
      page: "Aide",
      prenom: req.compte.prenom,
      nom: req.compte.nom,
      email: req.compte.email,
      statut: req.compte.statut,
      estAttribue: req.compte.estAttribue,
      comptes: "",
    });
  }
};

export const getAidePage = (req, res) => {
  if (req.estConnecte) {
    res.redirect("/compte");
  } else {
    res.render("pages/aide", {
      estConnecte: false,
      page: "Aide",
      statut: "",
      estAttribue: false,
    });
  }
};
