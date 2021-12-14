import ConfigModel from "../../models/config.js";
import CompteModel from "../../models/compte.js";

export const postUpdateDateSoutenances = async (req, res) => {
    // check si on a deja des infos dans la BDD
    var length = await ConfigModel.find().count()

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