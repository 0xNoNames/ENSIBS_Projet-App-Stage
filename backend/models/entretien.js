import pkg from "mongoose";
const { Schema, model } = pkg;

const EntretienSchema = new Schema({
  id_organisateur: { type: Object, required: true },
  date: { type: Date, default: Date.now },
  lieu: { type: String, default: undefined },
  id_invitation: { type: [Number], default: undefined },
  url_teams : {type:String},
  enseignant : {type:String}
  entreprises_inscrites : {type : [Object]}
});

const Entretien = model("entretien", EntretienSchema);

export default Entretien;
