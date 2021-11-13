import OffreModel from "../../models/offre.js";
import CompteModel from "../../models/offre.js";

export const getOffres = async (req, res) => {
    try {
        const offres = await OffreModel.find();
        if (!items) throw Error("Pas d'offres");

        res.status(200).json(offres);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
};

export const createOffre = async (req, res) => {
    var binaire = req.body;
    var id_user = req.compte.id;
    var email = req.compte.email;

    var nom_poste = req.headers.nom_poste;
    var nom_entreprise = req.headers.nom_entreprise;
    var formation = req.headers.formation;

    // Check if the user has a account in the DB
    try {
        const mongoCompte = await CompteModel.findOne({ email });
        if (!mongoCompte && false) {
            res.status(400).json({ msg: "Compte non trouvé" })
        } else {

            // Create the oofer
            const cv = await OffreModel.create({ binaire: binaire, nom_entreprise: nom_entreprise, formation: formation, nom_poste: nom_poste });
            console.log("L'offre a bien ete upload")
            res.status(200).json({ msg: "L'offre a bien ete upload" })
        }
    } catch (erreur) {
        console.log(erreur)
    }
};


export const updateOffre = async (req, res) => {
    try {
        const offre = await OffreModel.findById(req.params.id);
        if (!offre) throw Error("Pas d'offre trouvée");

        /** update offer */
        // const removed = await offre.remove();
        // if (!removed)
        //     throw Error("Quelque chose s'est mal passé en essayant de supprimer l'offre.");

        res.status(200).json({ success: true });
    } catch (e) {
        res.status(400).json({ msg: e.message, success: false });
    }
};

export const deleteOffre = async (req, res) => {
    try {
        const offre = await OffreModel.findById(req.params.id);
        if (!offre) throw Error("Pas d'offre trouvée");

        const removed = await offre.remove();
        if (!removed)
            throw Error("Quelque chose s'est mal passé en essayant de supprimer l'offre.");

        res.status(200).json({ success: true });
    } catch (e) {
        res.status(400).json({ msg: e.message, success: false });
    }
};