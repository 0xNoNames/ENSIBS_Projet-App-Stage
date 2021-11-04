// -- -- -- -- -- -- -- -- --  -- IMPORTS -- -- -- -- -- -- -- -- --  -- \\

import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
// import bodyParser from 'body-parser';
import morgan from "morgan";
import dotenv from "dotenv";

// -- -- -- -- -- -- -- -- --  -- ROUTES -- -- -- -- -- -- -- -- --  -- \\

// -- -- -- API -- -- -- \\
import authRoutesAPI from "./backend/routes/api/auth.js";
import itemsRoutesAPI from "./backend/routes/api/items.js";
import usersRoutesAPI from "./backend/routes/api/users.js";
import cvsRoutesAPI from "./backend/routes/api/cvs.js";
import soutenancesRoutesAPI from "./backend/routes/api/soutenances.js";

// -- -- -- non-API -- -- -- \\
import contactRoutes from "./backend/routes/contact.js";
import cvthequeRoutes from "./backend/routes/cvtheque.js";
import utilisateurRoutes from "./backend/routes/utilisateur.js";
import offresRoutes from "./backend/routes/offres.js";
import recuperationRoutes from "./backend/routes/recuperation.js";
import soutenancesRoutes from "./backend/routes/soutenance.js";

// -- -- -- -- -- -- -- -- --  -- CONFIG -- -- -- -- -- -- -- -- --  -- \\

dotenv.config({ path: "backend/.env" });

const app = express();

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set("view engine", "html");

// Static folder
app.use("/static", express.static(__dirname + "/frontend"));

// -- -- -- -- -- -- -- -- --  -- MIDDLEWARES -- -- -- -- -- -- -- -- --  -- \\

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan("dev"));
// Bodyparser Middleware
app.use(express.json());

// -- -- -- -- -- -- -- -- --  -- DATABASE -- -- -- -- -- -- -- -- --  -- \\

// DB Config
const db = `${process.env.MONGO_URI}/${process.env.MONGO_DB_NAME}`;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// -- -- -- -- -- -- -- -- --  -- ROUTING API -- -- -- -- -- -- -- -- --  -- \\

// Use Routes
app.use("/api/items", itemsRoutesAPI);
app.use("/api/users", usersRoutesAPI);
app.use("/api/auth", authRoutesAPI);
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
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/frontend/accueil.html");
});

// Page de la CVthèque
app.use("/cvtheque", cvthequeRoutes);

// Page des soutenances
app.use("/soutenances", soutenancesRoutes);

// Page de contact
app.use("/contact", contactRoutes);

// Page de connexion, inscription et profile
app.use("/utilisateur", utilisateurRoutes);

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

app.listen(process.env.PORT, () =>
  console.log(`Server started on http://localhost:${process.env.PORT}`)
);
