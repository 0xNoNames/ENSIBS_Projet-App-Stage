import validator from "validator";
import SoutenanceModel from "../../models/soutenance.js";
import CompteModel from "../../models/compte.js";
import EntretienModel from "../../models/entretien.js"

export const getSoutenances = async (req, res) => {
  console.log("GETTING SOUTENANCES");
  if(req.compte.statut == "CyberData") {
    const entretiens = await EntretienModel.find();

    var result_entretiens = [];
    for(const entretien of entretiens) {
      try {
        const user = await CompteModel.findOne({ id: entretien.id_organisateur });
        var title = user.nom;

        var date = entretien.date;
        var dateString = date.toISOString();

        // format "2016-02-18T23:59:48.039Z"
        var start = dateString.replace("T", " ").slice(0, -5);

        var endDate = date.setHours(date.getHours() + 1);
        var end = dateString.replace("T", " ").slice(0, -5);

        var id = entretien.id_organisateur;

        var entretienResult = { title: title, start: start, end: endDate, id: id };
        result_entretiens.push(entretienResult);
      } catch(erreur) {
        console.log(erreur);
      }
    }
    res.status(200).json(JSON.stringify({ result: result_entretiens }));
  } else if(req.compte.statut == "CyberLog") {
    const soutenances = await SoutenanceModel.find({});

    var result_soutenances = [];

    for (const soutenance of soutenances) {
    try {
      const user = await CompteModel.findOne({ id: soutenance.id_organisateur });
      var title = user.nom;

      var date = soutenance.date;
      var dateString = date.toISOString();

      // format "2016-02-18T23:59:48.039Z"
      var start = dateString.replace("T", " ").slice(0, -5);

      var endDate = date.setHours(date.getHours() + 1);
      var end = dateString.replace("T", " ").slice(0, -5);

      var id = soutenance.id_organisateur;

      var soutenanceResult = { title: title, start: start, end: endDate, id: id };

      result_soutenances.push(soutenanceResult);
    } catch (erreur) {
      console.log(erreur);
    }
  }
  res.status(200).json(JSON.stringify({ result: result_soutenances }));
  } else if(req.compte.statut == "Administrateur" || req.compte.statut == "Entreprise") {

    const soutenances = await SoutenanceModel.find({});
    const entretiens = await EntretienModel.find({});

    var result_soutenances = [];

    for (const soutenance of soutenances) {
      try {
        const user = await CompteModel.findOne({ id: soutenance.id_organisateur });
        var title = user.nom;

        var date = soutenance.date;
        var dateString = date.toISOString();

        // format "2016-02-18T23:59:48.039Z"
        var start = dateString.replace("T", " ").slice(0, -5);

        var endDate = date.setHours(date.getHours() + 1);
        var end = dateString.replace("T", " ").slice(0, -5);

        var id = soutenance.id_organisateur;

        var soutenanceResult = { title: title, start: start, end: endDate, id: id };

        result_soutenances.push(soutenanceResult);
      } catch (erreur) {
        console.log(erreur);
      }
    }

    for (const ent of entretiens) {
      try {
        const user = await CompteModel.findOne({ id: ent.id_organisateur });
        var title = user.nom;

        var date = ent.date;
        var dateString = date.toISOString();

        // format "2016-02-18T23:59:48.039Z"
        var start = dateString.replace("T", " ").slice(0, -5);

        var endDate = date.setHours(date.getHours() + 1);
        var end = dateString.replace("T", " ").slice(0, -5);

        var id = ent.id_organisateur;

        var soutenanceResult = { title: title, start: start, end: endDate, id: id };

        result_soutenances.push(soutenanceResult);
      } catch (erreur) {
        console.log(erreur);
      }
    }

    res.status(200).json(JSON.stringify({ result: result_soutenances }));
    

  }
};

export const createSoutenance = async (req, res) => {
  // Get the values in the requests
  var json = JSON.parse(req.body)

  var date = json.date;
  var lieu = json.lieu;
  var hour = json.hour;
  var confidentiel_value = json.confidentiel;
  var nom_soutenance = json.nom_soutenance;


  try {
    if (!lieu === undefined && !validator.isAlphanumeric(lieu, "fr-FR", { ignore: " '-_" })) res.status(400).json({ message: "Le nom du lieu contient des caracteres non valides" });

    //if (!validator.isNumeric(date, { ignore: "-" })) res.status(400).json({ message: "La date contient des caracteres non valide" });
    //if (!validator.isNumeric(hour, { ignore: ":" })) res.status(400).json({ message: "L'heure contient des caracteres non valide" });
  } catch (erreur) {
    console.log(erreur);
  }

  if (confidentiel_value == "on") {
    var confidentiel = true;
  } else {
    var confidentiel = false;
  }

  var id = req.compte.id;
  var email = req.compte.email;

  // Create the Date Object
  var year = date.slice(0, 4);
  var monthIndex = date.slice(5, 7);
  var day = date.slice(8, 10);
  var hours = hour.slice(0, 2);
  var hoursint = parseInt(hours);
  var minutes = hour.slice(3, 5);
  date = new Date(year, monthIndex-1, day, hoursint+1, minutes);
  try {
    // verifier si le compte existe
    const mongoCompte = await CompteModel.findOne({ email });

    if (!mongoCompte) {
      res.status(400).json({ msg: "Compte non trouvé" });
    } else {
      if(req.compte.statut == "CyberLog") {
        const soutenance = await SoutenanceModel.create({ id_organisateur: id, date: date, lieu: lieu, confidentiel: confidentiel, nom_soutenance: nom_soutenance });
        console.log("Le soutenance a bien ete upload");

        res.status(200).json({ msg: "La soutenance a bien ete upload" });
      } else if(req.compte.statut == "CyberData") {

        const entretien = await EntretienModel.create({id_organisateur: id, date: date, lieu: lieu})
        console.log("L'entretien a bien ete upload");

        res.status(200).json({ msg: "L'entretien a bien ete upload" });
      }
    }
  } catch (erreur) {
    console.log(erreur);
    res.status(400);
  }

  res.status(200);
};

export const updateSoutenance = (req, res) => {
  res.status(200);
};

export const deleteSoutenance = (req, res) => {
  res.status(200);
};
