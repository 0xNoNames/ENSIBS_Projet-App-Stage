// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import path from "path";
// import UtilisateurModel from "../models/utilisateur.js";

// dotenv.config({ path: "backend/.env" });

// const __dirname = path.resolve("./");

const estEtudiant = async (req, res, next) => {
    console.log(req.user);
    // req.user
    //   try {
    //     try {
    //       const { headers } = req;
    //       var cookies = headers.cookie.split(";")[0];
    //       var parts = cookies.split("=");
    //     } catch (error) {
    //       res.status(401);
    //       return res.render("pages/erreur401", {
    //         estConnecte: false,
    //         page: "",
    //       });
    //     }

    //     const cookie = { name: parts[0], token: parts[1] };

    //     /* On vérifie que le JWT est présent dans les cookies de la requête */
    //     if (!cookie || !cookie.name || !cookie.token) {
    //       res.status(401);
    //       return res.render("pages/erreur401", {
    //         estConnecte: false,
    //         page: "",
    //       });
    //     }

    //     const token = cookie.token;

    //     /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
    //     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    //     /* On vérifie que l'utilisateur existe bien dans notre base de données */
    //     const userId = decodedToken.sub;
    //     const user = await UtilisateurModel.findOne({ where: { id: userId } });
    //     if (!user) {
    //       res.status(401);
    //       return res.render("pages/erreur401", {
    //         estConnecte: false,
    //         page: "",
    //       });
    //     };

    //     /* On passe l'utilisateur dans notre requête afin que celui-ci soit disponible pour les prochains middlewares */
    //     req.user = user;

    // /* On appelle le prochain middleware */
    return next();
    //   } catch (err) {
    //     console.log(err);
    //     return res.status(500).json({ message: "Erreur interne." });
    //   }
};

export default estEtudiant;