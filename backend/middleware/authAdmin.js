import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import UtilisateurModel from "../models/utilisateur.js";

dotenv.config({ path: "backend/.env" });


const __dirname = path.resolve("./");


const auth = async (req, res, next) => {
    try {
        try {
            const { headers } = req;
            var cookies = headers.cookie.split(";")[0];
            var parts = cookies.split("=");
        } catch (error) {
            // return res.status(401).json({ message: "Pas de token dans les cookies." });
            // return res.redirect(301, "/utilisateur/connexion");
            return res.sendFile(__dirname + "/frontend/error401.html", 401);
        }

        const cookie = { name: parts[0], token: parts[1] };

        /* On vérifie que le JWT est présent dans les cookies de la requête */
        if (!cookie || !cookie.name || !cookie.token) {
            // return res.status(401).json({ message: "Pas de token dans les cookies." });
            // return res.redirect(301, "/utilisateur/connexion");
            return res.sendFile(__dirname + "/frontend/error401.html", 401);
        }

        const token = cookie.token;

        /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedToken)

        /* On vérifie que l'utilisateur existe bien dans notre base de données */
        const userId = decodedToken.sub;
        const user = await UtilisateurModel.findOne({ where: { id: userId } });
        if (!user) {
            // return res.status(401).json({ message: `L'utilisateur ${userId} n'existe pas.` });
            // return res.redirect(301, "/utilisateur/connexion");
            return res.sendFile(__dirname + "/frontend/error401.html", 401);
        }

        console.log(user);

        /* On passe l'utilisateur dans notre requête afin que celui-ci soit disponible pour les prochains middlewares */
        req.user = user;

        // /* On appelle le prochain middleware */
        return next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erreur interne." });
    }
};

export default auth;
