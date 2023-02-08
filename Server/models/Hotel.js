const mongoose = require('mongoose');

const { Schema } = mongoose;

const hotelSchema = new Schema({
  type: {
    type: String,
    default:'saved-hotel'
  },
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    require: true
  },
  endDate: {
    type: String,
    require:true
  },
  cost: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },

});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
