import pkg from "mongoose";
const { Schema, model } = pkg;

const OffreSchema = new Schema({
  nom_entreprise : {type:String},
  nom_poste: { type: String },
  date: { type: Date, default: Date.now },
  formation:{
    type:String,
    enum:["cyberlog", "cyberdata"],
    required:true
  },
  binaire : { type: Buffer, required: true },
  lieu_poste : {type:String}
});

  
const Offre = model("offre", OffreSchema);

export default Offre;
