import CompteModel from "../../models/compte.js";
import OffreModel from "../../models/offre.js";

export const offrePageData = async (req,res) =>{
	try {
	    const Offres = await OffreModel.find();
	    const comptes = await CompteModel.find();
	    res.render("pages/offres", {
	      estConnecte: true,
	      page: "Offres",
	      offres: Offres,
	      comptes : comptes,
	      prenom:req.compte.prenom,
	});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const offrePageLog = async (req,res) =>{
	try {
	    const Offres = await OffreModel.find();
	    const comptes = await CompteModel.find();
	    res.render("pages/offres", {
	      estConnecte: true,
	      page: "Offres",
	      offres: Offres,
	      comptes : comptes,
	      prenom:req.compte.prenom,
	});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}