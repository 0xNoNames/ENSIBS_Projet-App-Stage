import pkg from "mongoose";
const { Schema, model } = pkg;

const CvSchema = new Schema({
  chemin: { type: String, required: true },
  id_eleve: { type: Number, required: true },
});

const Cv = model("cv", CvSchema);

export default Cv;
