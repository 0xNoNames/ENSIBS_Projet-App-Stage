import pkg from 'mongoose';
const { Schema, model } = pkg;


// Create Schema
const SoutenanceSchema = new Schema({
  id_organisateur: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  place: {
    type: String,
    default: undefined
  },
  invited_id: {
    type: [Number],
    default: undefined
  }
});

const Soutance = model('soutenance', SoutenanceSchema);

export default Soutance;
