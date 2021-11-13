import SoutenanceModel from "../../models/soutenance.js";
import CompteModel from "../../models/compte.js";

export const getSoutenances = (req, res) => {
  // var base_dir = path.resolve("./");
  // res.sendFile(base_dir + "/frontend/soutenances.html");
};

export const createSoutenance = async (req, res) => {
  // Get the values in the requests
  var date = req.body.date;
  var lieu = req.body.lieu;
  var hour = req.body.hour;

  var id = req.compte.id;
  var email = req.compte.email;



  // Create the Date Object
  var year = date.slice(0,4);
  var monthIndex = date.slice(5,7);
  var day = date.slice(9,10);
  var hours = hour.slice(0,2);
  var minutes = hour.slice(3,5)
  var date = new Date(year, monthIndex, day, hours, minutes)





  try{
    // verifier si le compte existe
    const mongoCompte = await CompteModel.findOne({ email });

    if (!mongoCompte){
      res.status(400).json({msg :"Compte non trouvé"})
    } else {
      const cv = await SoutenanceModel.create({id_organisateur : id,date:date,lieu:lieu});
      console.log("Le soutenance a bien ete upload")

      res.status(200).json({msg : "Le CV a bien ete upload"})
    }
  } catch(erreur){
    console.log(erreur)
    res.status(400);
  }


  /*
      const newSoutenance = new Soutenance({
          name,
          email,
          password: hash
        });
        
      const savedUser = await newUser.save();
  
       
  
        res.status(200).json({
          token,
          user: {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email
          }
        }); */

  res.status(200);
};

export const updateSoutenance = (req, res) => {
  res.status(200);
};

export const deleteSoutenance = (req, res) => {
  res.status(200);
};
