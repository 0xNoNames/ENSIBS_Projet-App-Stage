import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UtilisateurModel from "../models/utilisateur.js";

dotenv.config({ path: "backend/.env" });

const estConnecte = async (req, res, next) => {
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
      return next();
    }

    /* On vérifie que le JWT est présent dans les cookies de la requête */
    if (cookieToken.nom != "token" || cookieToken.token == "") {
      req.estConnecte = false;
      req.utilisateur = "";
      return next();
    }

    console.log(cookieToken);

    try {
      /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
      decodedToken = jwt.verify(cookieToken.token, process.env.JWT_SECRET);
    } catch (error) {
      req.estConnecte = false;
      req.utilisateur = "";
      return next();
    }

    /* On vérifie que l'utilisateur existe bien dans notre base de données */
    const userId = decodedToken.sub;
    const utilisateur = await UtilisateurModel.findOne({ where: { id: userId } });
    if (!utilisateur) {
      req.estConnecte = false;
      req.utilisateur = "";
      return next();
    }

    req.utilisateur = utilisateur;
    req.estConnecte = true;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur interne." });
  }
};

export default estConnecte;
