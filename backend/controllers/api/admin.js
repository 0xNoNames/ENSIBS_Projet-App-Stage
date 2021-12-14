import ConfigModel from "../../models/config.js";

export const postUpdateDateSoutenances = async (req, res) => {
    // check si on a deja des infos dans la BDD
    var length = await ConfigModel.find().count()

    try {
        if (!validator.isAlphaNumeric(req.body.start, "fr-FR", { ignore: "'() -/,&[]@:." })) new Error("Le début contient des caractères invalides");
        if (!validator.isAlphaNumeric(req.body.end, "fr-FR", { ignore: "'() -/,&[]@:." })) new Error("La fin contient des caractères invalides");
    } catch (erreur) {
        console.error("ERROR backend/controllers/api/comptes.js #postUpdateDateSoutenances() : " + erreur);
        return res.status(400).json(erreur.message);
    }

    if (length == 0) {
        // On doit créer la table
        await ConfigModel.create({ date_debut_soutenances: req.body.start, date_fin_soutenances: req.body.end });
    } else {
        // We update the current table 
        var all_config = await ConfigModel.find()
        var id = all_config[0].id
        await ConfigModel.findOneAndUpdate({ _id: id }, { $set: { date_debut_soutenances: req.body.start, date_fin_soutenances: req.body.end } })
    }

}


export const postUpdateJury = async (req, res) => {

    var juryData = req.body.jury

    try {
        if (!validator.isAlphanumeric(juryData, "fr-FR", { ignore: "'() -/,&[]@:." })) new Error("L'id contient des caractères invalides");
    } catch (erreur) {
        console.error("ERROR backend/controllers/api/comptes.js #postUpdateJury() : " + erreur);
        return res.status(400).json(erreur.message);
    }

    // We update the current table 
    var all_config = await ConfigModel.find()
    var id = all_config[0].id
    await ConfigModel.findOneAndUpdate({ _id: id }, { $set: { nombre_jurys: juryData } })

}