import OffreModel from "../../models/offre.js";

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
    const nouvelleOffre = new OffreModel({
        name: req.body.name
    });

    try {
        const offre = await nouvelleOffre.save();
        if (!offre) throw Error('Something went wrong saving the offre');

        res.status(200).json(offre);
    } catch (e) {
        res.status(400).json({ msg: e.message });
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
