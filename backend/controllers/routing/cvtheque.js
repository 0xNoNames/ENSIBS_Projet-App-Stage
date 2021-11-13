import CVModel from "../../models/cv.js";


export const cvPage = async (req,res) =>{
	try {
	    const Cvs = await CVModel.find();
	    res.render("pages/cvtheque", {
	      estConnecte: true,
	      page: "CVthèque",
	      username: req.compte.prenom+"_"+req.compte.nom,
	      cvs: Cvs,
	      prenom:req.compte.prenom,
	      userid:req.compte.id
	});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}