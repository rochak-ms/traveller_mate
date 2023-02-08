const mongoose = require('mongoose');

const { Schema } = mongoose;

const tripSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    // required: true,
    trim: true

  },
  flights: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Flight'
    }
  ],
  hotels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Hotel'
    }
  ],
}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

tripSchema.virtual('totalCost').get(function(){
  let flightCost =0; let hotelCost=0;
  if (this.flights) flightCost = this.flights.reduce((a, b) => a + (b.cost || 0), 0);
  if (this.hotels) hotelCost = this.hotels.reduce((a, b) => a + (b.cost || 0), 0);
  return flightCost + hotelCost;
})

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
