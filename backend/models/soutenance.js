import pkg from "mongoose";
const { Schema, model } = pkg;

const SoutenanceSchema = new Schema({
  id_organisateur: { type: Object, required: true },
  date: { type: Date, default: Date.now, required: true },
  lieu: { type: String, default: undefined, required: true },
  id_invitation: { type: [Number], default: undefined },
  url_teams: { type: String },
  nom_maitre_stage: { type: String },
});

const Soutance = model("soutenance", SoutenanceSchema);

export default Soutance;
