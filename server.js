// -- -- -- -- -- -- -- -- --  -- IMPORTS -- -- -- -- -- -- -- -- --  -- \\

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// -- -- -- -- -- -- -- -- --  -- ROUTES -- -- -- -- -- -- -- -- --  -- \\

// -- -- -- API -- -- -- \\
import offresRoutesAPI from "./backend/routes/api/offres.js";
import utilisateursRoutesAPI from "./backend/routes/api/utilisateurs.js";
import cvsRoutesAPI from "./backend/routes/api/cvs.js";
import soutenancesRoutesAPI from "./backend/routes/api/soutenances.js";

// -- -- -- non-API -- -- -- \\
import contactRoutes from "./backend/routes/routing/contact.js";
import cvthequeRoutes from "./backend/routes/routing/cvtheque.js";
import compteRoutes from "./backend/routes/routing/compte.js";
import offresRoutes from "./backend/routes/routing/offres.js";
import recuperationRoutes from "./backend/routes/routing/recuperation.js";
import soutenancesRoutes from "./backend/routes/routing/soutenance.js";

// -- -- -- -- -- -- -- -- --  -- CONFIG -- -- -- -- -- -- -- -- --  -- \\

dotenv.config({ path: "backend/.env" });

const app = express();

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "html");

app.use("/static", express.static(__dirname + "/frontend"));

// -- -- -- -- -- -- -- -- --  -- MIDDLEWARES -- -- -- -- -- -- -- -- --  -- \\

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ type: "*/*", }));

// -- -- -- -- -- -- -- -- --  -- DATABASE -- -- -- -- -- -- -- -- --  -- \\

// Configuration de Mongo
const mongo = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;

// Connexion à Mongo
mongoose.connect(mongo, { useNewUrlParser: true, })
  .then(() => console.log("Connecté à la base de données MongoDB..."))
  .catch((err) => console.log(err));

// -- -- -- -- -- -- -- -- --  -- ROUTING API -- -- -- -- -- -- -- -- --  -- \\

// Use Routes
app.use("/api/offres", offresRoutesAPI);
app.use("/api/utilisateurs", utilisateursRoutesAPI);
app.use("/api/cvs", cvsRoutesAPI);
app.use("/api/soutenances", soutenancesRoutesAPI);
// app.update("/api/estconnecte", auth, (req, res) => { res.sendStatus(200) });

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
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontend/accueil.html");
});
// }, () => {
//   res.sendFile(__dirname + "/frontend/accueil_co.html");
// });

// Page de la CVthèque
app.use("/cvtheque", cvthequeRoutes);

// Page des soutenances
app.use("/soutenances", soutenancesRoutes);

// Page de contact
app.use("/contact", contactRoutes);

// Page de connexion, inscription et profil
app.use("/compte", compteRoutes);

// Page de récupération
app.use("/recuperation", recuperationRoutes);

// Page des offres
app.use("/offres", offresRoutes);

// // Send a mail
// app.post("/mail", function(req, res) {
//     res.send("mail page");
// });

// Page d 'erreur 404 (mettre en dernière route)
app.get("*", function (req, res) {
  res.sendFile(__dirname + "/frontend/error404.html", 404);
});

// -- -- -- -- -- -- -- -- --  -- DEMARRAGE SERVEUR -- -- -- -- -- -- -- -- --  -- \\

app.listen(process.env.PORT, () => console.log(`Server started on http://localhost:${process.env.PORT}`));
