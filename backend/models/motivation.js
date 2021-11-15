import pkg from "mongoose";
const { Schema, model } = pkg;

const MotivationSchema = new Schema({
  id_eleve: { type: Object, required: true },
  binaire: { type: Buffer },
  formation: {
    type: String,
    enum: ["CyberLog", "CyberData"],
    required: true,
  },
});

const Motivation = model("motivation", MotivationSchema);

export default Motivation;
