import ConfigModel from "../../models/config.js";


export const getContraintesPage = async (req, res) => {
    var length = await ConfigModel.find().count()
    if (length != 0) {
        // We get the config
        var all_config = await ConfigModel.find()
        var id = all_config[0].id
        var config = await ConfigModel.findOne({ _id: id })

        var startSoutenance = config.date_debut_soutenances;
        var finSoutenances = config.date_fin_soutenances;

        var nombre_jours = parseInt(finSoutenances.slice(-2)) - parseInt(startSoutenance.slice(-2))
    }

    const creneaux = JSON.parse(process.env.CRENEAUX);
    res.render("pages/contraintes", {
        estConnecte: true,
        page: "CVthèque",
        prenom: req.compte.prenom,
        statut: req.compte.statut,
        estAttribue: req.compte.estAttribue,
        startSoutenance:startSoutenance,
        nombre_jours : nombre_jours,
        creneaux: creneaux,
    });

};