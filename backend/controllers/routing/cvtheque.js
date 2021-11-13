import CVModel from "../../models/cv.js";
import CompteModel from "../../models/compte.js";


export const cvPage = async (req,res) =>{
	try {
	    const Cvs = await CVModel.find();
	    const comptes = await CompteModel.find();
	    res.render("pages/cvtheque", {
	      estConnecte: true,
	      page: "CVthèque",
	      cvs: Cvs,
	      comptes : comptes,
	      prenom:req.compte.prenom,
	      
	});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}