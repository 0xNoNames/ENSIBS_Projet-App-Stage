import pkg from "mongoose";
const { Schema, model } = pkg;

const OffreSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  //to complete
});

const Offre = model("offre", OffreSchema);

export default Offre;
