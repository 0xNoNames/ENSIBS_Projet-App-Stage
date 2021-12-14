import pkg from "mongoose";
const { Schema, model } = pkg;

const SalleSchema = new Schema({
  name : {type:String,required:true},
  disponible : {type:Boolean}
});

const Salle = model("salle", SalleSchema);

export default Salle;
