import pkg from "mongoose";
const { Schema, model } = pkg;

const CvSchema = new Schema({
  binaire: { type: Buffer, required: true },
  id_eleve: { type: Object, required: true },
  formation: {
    type: String,
    enum: ["CyberLog", "CyberData"],
    required: true,
  },
  linkedin: { type: String },
  description: { text: String },
});

const Cv = model("cv", CvSchema);

export default Cv;
