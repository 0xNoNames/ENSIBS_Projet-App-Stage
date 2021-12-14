import dotenv from "dotenv";
import CompteModel from "../../models/compte.js";
import CVModel from "../../models/cv.js";
import MotivationModel from "../../models/motivation.js";

dotenv.config({ path: "../.env" });


export const getAdminPage = (req, res) => {
    res.render("pages/admin", {
        estConnecte: true,
        page: "Admin",
        prenom: req.compte.prenom,
        statut: req.compte.statut,
        estAttribue: req.compte.estAttribue,
    });
};