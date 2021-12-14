import pkg from "mongoose";
const { Schema, model } = pkg;

const ConfigSchema = new Schema({
  date_debut_soutenances: { type: String },
  date_fin_soutenances: { type: String },
});

const Config = model("config", ConfigSchema);

export default Config;