import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UtilisateurModel from "../models/utilisateur.js";

dotenv.config({ path: "backend/.env" });

const estConnecte = async (req, res) => {
  var cookieToken;
  try {
    try {
      var cookies = req.headers.cookie.split(";");
      cookies.forEach((cookie) => {
        let parts = cookie.split("=");
        if ((parts[0] = "token")) {
          cookieToken = { name: parts[0], token: parts[1] };
        }
      });
    } catch (error) {
      return false;
    }

    /* On vérifie que le JWT est présent dans les cookies de la requête */
    if (!cookieToken.name == "token" || !cookieToken.name || !cookieToken.token) {
      return false;
    }

    const token = cookieToken.token;

    /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    /* On vérifie que l'utilisateur existe bien dans notre base de données */
    const userId = decodedToken.sub;
    const user = await UtilisateurModel.findOne({ where: { id: userId } });
    if (!user) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur interne." });
  }
};

export default estConnecte;
