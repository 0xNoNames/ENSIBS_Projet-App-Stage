import ConfigModel from "../../models/config.js";

export const postUpdateDateSoutenances = async (req, res) => {
    // check si on a deja des infos dans la BDD
    var length = await ConfigModel.find().count()

    if (!validator.isAlphaNumeric(req.body.start, "fr-FR", { ignore: "'() -/,&[]@:." })) {
        var erreur = "Le début contient des caractères invalides";
        console.error("ERROR backend/controllers/api/comptes.js #postUpdateDateSoutenances() : " + erreur);
        return res.status(400).json({ message: erreur });
    }

    if (!validator.isAlphaNumeric(req.body.end, "fr-FR", { ignore: "'() -/,&[]@:." })) {
        var erreur = "La fin contient des caractères invalides";
        console.error("ERROR backend/controllers/api/comptes.js #postUpdateDateSoutenances() : " + erreur);
        return res.status(400).json({ message: erreur });
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

    if (!validator.isAlphanumeric(juryData, "fr-FR", { ignore: "'() -/,&[]@:." })) {
        var erreur = "L'id contient des caractères invalides";
        console.error("ERROR backend/controllers/api/comptes.js #postUpdateJury() : " + erreur);
        return res.status(400).json({ message: erreur });
    }

    // We update the current table 
    var all_config = await ConfigModel.find()
    var id = all_config[0].id
    await ConfigModel.findOneAndUpdate({ _id: id }, { $set: { nombre_jurys: juryData } })

}