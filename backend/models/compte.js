import pkg from "mongoose";
const { Schema, model } = pkg;

const CompteSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  statut: {
    type: String,
    enum: ["CyberLog", "CyberData", "Entreprise", "Administrateur","Enseignant"],
    required: true,
  },
  annee: {
    type: String,
    enum: ["4A", "5A"],
    required:false
  },
  estVerifie: { type: Boolean, default: false },
  estAttribue: { type: Boolean, default: false },
  date_inscription: { type: Date, default: Date.now },
  linkedin: { type: String },
  offres_sauvegardees : {type : [Object]},
});

const Compte = model("compte", CompteSchema);

export default Compte;
