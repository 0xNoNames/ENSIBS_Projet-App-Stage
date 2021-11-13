import pkg from "mongoose";
const { Schema, model } = pkg;

const OffreSchema = new Schema({
  nom_entreprise : {type:String},
  nom_poste: { type: String },
  date: { type: Date, default: Date.now },
  formation:{
    type:String,
    enum:["CyberLog", "CyberData"],
    required:true
  },
  binaire : { type: Buffer, required: true }
});

  
const Offre = model("offre", OffreSchema);

export default Offre;
