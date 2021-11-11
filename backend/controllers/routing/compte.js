import dotenv from "dotenv";

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
      prenom: req.compte.prenom,
    });
  }
};

export const getComptePage = (req, res) => {
  res.render("pages/compte", {
    estConnecte: true,
    page: "Compte",
    prenom: req.compte.prenom,
    nom: req.compte.nom,
    email: req.compte.email,
    role: req.compte.role,
  });
};

export const getAidePage = (req, res) => {
  if (req.estConnecte) {
    res.redirect("/compte");
  } else {
    res.render("pages/aide", {
      estConnecte: false,
      page: "Aide",
    });
  }
};
