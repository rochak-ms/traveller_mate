const mongoose = require('mongoose');

const { Schema } = mongoose;

const flightSchema = new Schema({
  type: {
    type: String,
    default:'saved-flight'
  },
  airline: {
    type: String,
    required: true,
  },
  departure: {
    type: String,
    require: true
  },
  return: {
    type: String
  },
  duration: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  people: {
    type: Number,
    required: true,
  },

});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
