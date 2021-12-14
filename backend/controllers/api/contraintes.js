import ConfigModel from "../../models/config.js";
import ContraintesModel from "../../models/contraintes.js";


export const postUpdateContraintes = async (req, res) => {
    var dispo_Creneau = req.body.date_Creneau
    const creneaux = JSON.parse(process.env.CRENEAUX);

    var config = await ConfigModel.findOne();

    var start = parseInt(config.date_debut_soutenances.slice(-2))
    var end = parseInt(config.date_fin_soutenances.slice(-2))
    var total_jour = end - start + 1

    for (var i = 0;i < dispo_Creneau.length; i++){
        var creneau = creneaux[i%creneaux.length]
        var jour = Math.floor(i/creneaux.length) + 1; 

        var contrainte = await ContraintesModel.findOne({id:req.compte.id,creneaux:creneau,jour:jour})
        
        if (contrainte == null){
            // Create the contraintes
            await ContraintesModel.create({id_enseignant:req.compte.id,creneaux:creneau,jour:jour,disponibilite:dispo_Creneau[i]})
        } else {
            // We update the contraintes
            await ContraintesModel.updateOne({ id:req.compte.id,creneaux:creneau,jour:jour}, {$set: {creneaux:creneau,jour:jour,disponibilite:dispo_Creneau[i]}})
        }

    }


}
