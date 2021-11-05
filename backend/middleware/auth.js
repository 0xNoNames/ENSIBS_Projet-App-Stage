import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "backend/.env" });

import UtilisateurModel from "../models/utilisateur.js";

const auth = async (req, res, next) => {
  try {
    try {
      const { headers } = req;
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

    const token = cookie.token;

    /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    /* On vérifie que l'utilisateur existe bien dans notre base de données */
    const userId = decodedToken.sub;
    const user = await UtilisateurModel.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ message: `L'utilisateur ${userId} n'existe pas.` });
    }

    /* On passe l'utilisateur dans notre requête afin que celui-ci soit disponible pour les prochains middlewares */
    req.user = user;

    // /* On appelle le prochain middleware */
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur interne." });
  }
};

export default auth;
