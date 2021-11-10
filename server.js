// -- -- -- -- -- -- -- -- --  -- IMPORTS -- -- -- -- -- -- -- -- --  -- \\

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { verifierToken } from "./backend/middleware/auth.js";

// -- -- -- -- -- -- -- -- --  -- ROUTES -- -- -- -- -- -- -- -- --  -- \\

// -- -- -- API -- -- -- \\
import offresRoutesAPI from "./backend/routes/api/offres.js";
import comptesRoutesAPI from "./backend/routes/api/comptes.js";
import cvsRoutesAPI from "./backend/routes/api/cvs.js";
import soutenancesRoutesAPI from "./backend/routes/api/soutenances.js";

// -- -- -- non-API -- -- -- \\
import contactRoutes from "./backend/routes/routing/contact.js";
import cvthequeRoutes from "./backend/routes/routing/cvtheque.js";
import compteRoutes from "./backend/routes/routing/compte.js";
import offresRoutes from "./backend/routes/routing/offres.js";
import soutenancesRoutes from "./backend/routes/routing/soutenance.js";

// -- -- -- -- -- -- -- -- --  -- CONFIG -- -- -- -- -- -- -- -- --  -- \\

dotenv.config({ path: "backend/.env" });

const app = express();

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname);

app.set("view engine", "ejs");
app.set("views", "./frontend/views");

app.use("/static", express.static(path.join(__dirname, "/frontend/assets")));

// -- -- -- -- -- -- -- -- --  -- MIDDLEWARES -- -- -- -- -- -- -- -- --  -- \\

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ type: "*/*" }));

// -- -- -- -- -- -- -- -- --  -- DATABASE -- -- -- -- -- -- -- -- --  -- \\

// Configuration de Mongo
const mongo = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;

// Connexion à Mongo
mongoose
  .connect(mongo, { useNewUrlParser: true })
  .then(() => console.log("Connecté à la base de données MongoDB..."))
  .catch((err) => console.log(err));

// -- -- -- -- -- -- -- -- --  -- ROUTING API -- -- -- -- -- -- -- -- --  -- \\

// Use Routes
app.use("/api/offres", offresRoutesAPI);
app.use("/api/comptes", comptesRoutesAPI);
app.use("/api/cvs", cvsRoutesAPI);
app.use("/api/soutenances", soutenancesRoutesAPI);

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//     // Set static folder
//     app.use(express.static("client/build"));

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }

// -- -- -- -- -- -- -- -- --  -- ROUTING -- -- -- -- -- -- -- -- --  -- \\

// Page d'accueil
app.get("/", verifierToken, (req, res) => {
  console.log(req.utilisateur.prenom);
  res.render("pages/accueil", {
    estConnecte: req.estConnecte,
    page: "Accueil",
    prenom: req.utilisateur.prenom,
  });
});

// Page de la CVthèque
app.use("/cvtheque", cvthequeRoutes);

// Page des soutenances
app.use("/soutenances", soutenancesRoutes);

// Page de contact
app.use("/contact", contactRoutes);

// Page de connexion, inscription, profil et aide
app.use("/compte", compteRoutes);

// Page des offres
app.use("/offres", offresRoutes);

// Send a mail
// app.post("/mail", function(req, res) {
//     res.send("mail page");
// });

// Page d 'erreur 404 (mettre en dernière route)
app.get("*", verifierToken, (req, res) => {
  res.status(404).render("pages/erreur404", {
    estConnecte: req.estConnecte,
    page: "Erreur 404",
    prenom: req.utilisateur.prenom,
  });
});

// -- -- -- -- -- -- -- -- --  -- DEMARRAGE SERVEUR -- -- -- -- -- -- -- -- --  -- \\

app.listen(process.env.PORT, () => console.log(`Server started on http://localhost:${process.env.PORT}`));
