import SoutenanceModel from "../../models/soutenance.js";
import CompteModel from "../../models/compte.js";

export const getSoutenances = async (req, res) => {
  console.log("GETTING SOUTENANCES")
  const soutenances = await SoutenanceModel.find({});

  var result_soutenances = []

  for (const soutenance of soutenances){
    try{
      const user = await CompteModel.findOne({id:soutenance.id_organisateur});
      var title = user.nom;
      
      var date = soutenance.date;
      var dateString = date.toISOString();

      // format "2016-02-18T23:59:48.039Z"
      var start = dateString.replace("T"," ").slice(0,-5);

      var endDate = date.setHours(date.getHours() + 1);
      var end = dateString.replace("T"," ").slice(0,-5);

      var id = soutenance.id_organisateur;

      var soutenanceResult = {title:title,start : start, end:endDate,id:id}

      result_soutenances.push(soutenanceResult);
    } catch (erreur){
      console.log(erreur);
    }
    
  }
  res.status(200).json(JSON.stringify({result:result_soutenances}))
};

export const createSoutenance = async (req, res) => {
  // Get the values in the requests
  var date = req.body.date;
  var lieu = req.body.lieu;
  var hour = req.body.hour;
  var confidentiel_value = req.body.confidentiel;
  var nom_soutenance = req.body.nom_soutenance;


  if (confidentiel_value == "on"){
    var confidentiel = true;
  } else {
    var confidentiel = false;
  }

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
      const cv = await SoutenanceModel.create({id_organisateur : id,date:date,lieu:lieu,confidentiel:confidentiel,nom_soutenance:nom_soutenance});
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
