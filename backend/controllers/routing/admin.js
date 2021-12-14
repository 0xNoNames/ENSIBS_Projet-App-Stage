import dotenv from "dotenv";
import ConfigModel from "../../models/config.js";
import CVModel from "../../models/cv.js";
import MotivationModel from "../../models/motivation.js";
import SalleModel from "../../models/salle.js";

dotenv.config({ path: "../.env" });


export const getAdminPage = async (req, res) => {
    var length = await ConfigModel.find().count()
    if (length != 0){
        // We get the config
        var all_config = await ConfigModel.find()
        var id = all_config[0].id
        var config = await ConfigModel.findOne({ _id: id })

        var startSoutenance = config.date_debut_soutenances;
        var finSoutenances = config.date_fin_soutenances;
        var juryData = config.nombre_jurys;

        var nombre_jours = parseInt(finSoutenances.slice(-2)) - parseInt(startSoutenance.slice(-2))

    };

    var salles = await SalleModel.find()

    res.render("pages/admin", {
        estConnecte: true,
        page: "Admin",
        prenom: req.compte.prenom,
        statut: req.compte.statut,
        estAttribue: req.compte.estAttribue,
        startSoutenance : startSoutenance,
        finSoutenances: finSoutenances,
        nombre_jours : nombre_jours,
        juryData: juryData,
        salles:salles,
    });
};