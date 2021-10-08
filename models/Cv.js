import pkg from 'mongoose';
const { Schema, model } = pkg;


// Create Schema
const CvSchema = new Schema({
  path: {
    type: String,
    required: true
  },
  id_student: {
    type: Number,
    required : true
  }
});

const Cv = model('cv', CvSchema);

export default Cv;
