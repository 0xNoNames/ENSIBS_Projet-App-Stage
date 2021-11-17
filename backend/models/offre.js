import pkg from "mongoose";
const { Schema, model } = pkg;

const OffreSchema = new Schema({
  id_entreprise: { type: String, required: true },
  nom_entreprise: { type: String, required: true },
  nom_poste: { type: String, required: true },
  formation: {
    type: String,
    enum: ["CyberData", "CyberLog"],
    required: true,
  },
  description: { type: String, required: true },
  binaire: { type: Buffer },
  lieu_poste: { type: String, required: true },
  estValide: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

const Offre = model("offre", OffreSchema);

export default Offre;
