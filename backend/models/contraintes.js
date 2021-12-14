import pkg from "mongoose";
const { Schema, model } = pkg;

const ContraintesSchema = new Schema({
  id_enseignant : {type:String, required:true},
  creneaux : {type:String},
  jour : {type: Number},
  disponibilite : {type: Boolean},
});

const Contraintes = model("contraintes", ContraintesSchema);

export default Contraintes;