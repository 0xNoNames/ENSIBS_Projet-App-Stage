import pkg from "mongoose";
const { Schema, model } = pkg;

const validationSchema = new Schema({
  _compteId: { type: Schema.Types.ObjectId, required: true, ref: "Compte" },
  token: { type: String, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } },
});

const Validation = model("validation", validationSchema);

export default Validation;
