import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "backend/.env" });

import UtilisateurModel from "../models/utilisateur.js";

const auth = async (req, res, next) => {
  try {
    const { headers } = req;

    try {
      var cookies = headers.cookie.split(";")[0];
      var parts = cookies.split("=");
    } catch (error) {
      return res.status(401).json({ message: "Pas de token dans les cookies." });
    }

    const cookie = { name: parts[0], token: parts[1] };

    /* On vérifie que le JWT est présent dans les cookies de la requête */
    if (!cookie || !cookie.name || !cookie.token) {
      return res.status(401).json({ message: "Pas de token dans les cookies." });
    }

    const accessToken = cookie.token;

    /* On vérifie que le token CSRF est présent dans les en-têtes de la requête */
    if (!headers || !headers["x-xsrf-token"]) {
      return res.status(401).json({ message: "Pas de token XSRF token dans les en-têtes." });
    }

    const xsrfToken = headers["x-xsrf-token"];

    /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);

    /* On vérifie que le token CSRF correspond à celui présent dans le JWT  */
    if (xsrfToken !== decodedToken.xsrfToken) {
      return res.status(401).json({ message: "Mauvais token XSRF." });
    }

    /* On vérifie que l'utilisateur existe bien dans notre base de données */
    const userId = decodedToken.sub;
    const user = await UtilisateurModel.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ message: `L'utilisateur ${userId} n'existe pas.` });
    }

    /* On passe l'utilisateur dans notre requête afin que celui-ci soit disponible pour les prochains middlewares */
    req.user = user;

    /* On appelle le prochain middleware */
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur interne." });
  }
};

export default auth;
