import pkg from 'mongoose';
const { Schema, model } = pkg;


// Create Schema
const Cv = new Schema({
  path: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Item = model('item', Cv);