import CVModel from "../../models/cv.js";
import CompteModel from "../../models/compte.js"

export const getCVs = async (req, res) => {
  try {
    const Cvs = await CVModel.find();
    res.status(200).json(Cvs);
  } catch (error) {
    res.error(404).json({ message: error.message });
  }
};

export const createCV = async (req, res) => {
  console.log("CV API.JS : upload Unique CV")
  var binaire = req.body;
  var id_user = req.compte.id;
  var email = req.compte.email;
  //var estCyberLog = req.compte.



  // Check if the user has a account in the DB
  try{
    const mongoCompte = await CompteModel.findOne({ email });

    if (!mongoCompte){
      res.status(400).json({msg :"Compte non trouvé"})
    } else {
      const cv = await CVModel.create({binaire,id_eleve:id_user});
      console.log("Le Cv a bien ete upload")

      res.status(200).json({msg : "Le CV a bien ete upload"})
    }
  } catch(erreur){
    console.log(erreur)
    res.status(400);
  }
  

  
};


export const getStudentCV = async (req, res) => {
  console.log("CV API.JS : REQUEST Unique CV")
  var id_user = req.compte.id;
  const mongoCompte = await CompteModel.findOne({ id_user });
  const pdfBinary = await CVModel.findOne({id_user});
  if (pdfBinary){
    //console.log("CV API.JS : "+ pdfBinary)
    var username = mongoCompte._id;
    var binary = pdfBinary.binaire;
    //console.log(binary)
    res.contentType("pdf");
    res.end(binary, 'binary');
  } else {
    res.status(400);
  }
  
}

export const updateCV = (req, res) => {
  res.status(200);
};

export const deleteCV = (req, res) => {
  res.status(200);
};

export const deleteAnyCV = (req, res) => {
  res.status(200);
};