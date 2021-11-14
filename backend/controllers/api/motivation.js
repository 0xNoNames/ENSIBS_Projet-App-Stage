import MotivationModel from "../../models/motivation.js";
import CompteModel from "../../models/compte.js";

export const getMotivation = async (req, res) => {
	console.log("Uploading Motivation");


	var binaire = req.body.data_file;
    var id_user = req.compte.id;
    var email = req.compte.email;
    var formation = req.compte.statut;


	// Check if the user has a account in the DB
    try{
      const mongoCompte = await CompteModel.findOne({ email });
  
      if (!mongoCompte){
        res.status(400).json({msg :"Compte non trouvé"})
      } else {
        const cv = await MotivationModel.create({binaire,id_eleve:id_user,formation:formation});
        console.log("La lettre de motivation a bien ete upload")
  
        res.status(200).json({msg : "La lettre de motivation a bien ete upload"})
      }
    } catch(erreur){
      console.log(erreur)
      res.status(400);
  }
}