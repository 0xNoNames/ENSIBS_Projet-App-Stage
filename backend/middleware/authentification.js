// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import path from "path";
// import UtilisateurModel from "../models/utilisateur.js";

// dotenv.config({ path: "backend/.env" });

// const __dirname = path.resolve("./");

// const authentification = async (req, res, next) => {};
//   var cookieToken;
//   var decodedToken;

//   try {
//     try {
//       var cookies = req.headers.cookie.split(";");
//       cookies.forEach((cookie) => {
//         let parts = cookie.split("=");
//         if ((parts[0] = "token")) {
//           cookieToken = { nom: parts[0], token: parts[1] };
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(401).render("pages/erreur401", {
//         estConnecte: true,
//         page: "",
//       });
//     }

//     /* On vérifie que le JWT est présent dans les cookies de la requête */
//     if (cookieToken.nom != "token" || cookieToken.token == "") {
//       return res.status(401).render("pages/erreur401", {
//         estConnecte: true,
//         page: "",
//       });
//     }

//     try {
//       /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */
//       decodedToken = jwt.verify(cookieToken.token, process.env.JWT_SECRET);
//     } catch (error) {
//       return res.status(401).render("pages/erreur401", {
//         estConnecte: false,
//         page: "",
//       });
//     }

//     /* On vérifie que l'utilisateur existe bien dans notre base de données */
//     const userId = decodedToken.sub;
//     const user = await UtilisateurModel.findOne({ where: { id: userId } });
//     if (!user) {
//       return res.status(401).render("pages/erreur401", {
//         estConnecte: false,
//         page: "",
//       });
//     }

//     /* On passe l'utilisateur dans notre requête afin que celui-ci soit disponible pour les prochains middlewares */
//     req.user = user;

//     // /* On appelle le prochain middleware */
//     return next();
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Erreur interne." });
//   }
// };

// export default authentification;
