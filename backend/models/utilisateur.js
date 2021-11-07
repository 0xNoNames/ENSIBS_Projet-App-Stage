import pkg from "mongoose";
const { Schema, model } = pkg;

// Create Schema
const UtilisateurSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mot_de_passe: { type: String, required: true },
  date_inscription: { type: Date, default: Date.now },
  admin: { type: Boolean, default: false },
});

const Utilisateur = model("utilisateur", UtilisateurSchema);

export default Utilisateur;
