import pkg from "mongoose";
const { Schema, model } = pkg;

const OffreSchema = new Schema({
  id_entreprise: { type: String},id_entreprise: { type: Object, required: true },
  name_poste: { type: String },
  date: { type: Date, default: Date.now },
  formation:{
    type:String,
    enum:["CyberLog", "CyberData"],
    required:true
  }
});

  
const Offre = model("offre", OffreSchema);

export default Offre;
