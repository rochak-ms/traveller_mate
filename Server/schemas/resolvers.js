const { AuthenticationError } = require('apollo-server-express');
const { response } = require('express');
const { User, Trip, Flight, Hotel} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
              .populate({
                path:'trips',
                populate: 'flights hotels'
              });
            
  
          return userData;
        }
        throw new AuthenticationError('Not logged in');
    },
    flights: async() =>{
      return Flight.find()
    }
},
  
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    checkUsername: async (parent, {username})=>{
      const checker = await User.findOne({ username });
      if (checker) return true;
      else return false
    },
    checkEmail: async (parent, {email})=>{
      const checker = await User.findOne({ email });
      if (checker) return true;
      else return false
    },
    
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addTrip: async (parent, {tripData}, context) => {
      // console.log(context);
      if (context.user){
        const newTrip = await Trip.create({...tripData});

        const updatedUser = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$push: {trips: newTrip._id}},
          {new: true}
        ).populate('trips');
        return updatedUser;
      }

      throw new AuthenticationError('You needed to be logged in');
    },
    addFlight: async (parent, {flightData}, context) => {
      // console.log(context);
      if (context.user){
        const newFlight = await Flight.create({...flightData});
        // console.log(newFlight);
        const updatedTrip = await Trip.findByIdAndUpdate(
          {_id: flightData.tripId},
          {$push: {flights: newFlight._id}},
          {new: true}
          ).populate('flights');
        return updatedTrip;
      }

      throw new AuthenticationError('You needed to be logged in');
    },
    addHotel: async (parent, {hotelData}, context) => {
      // console.log(context);
      if (context.user){
        const newHotel = await Hotel.create({...hotelData});
        const updatedTrip = await Trip.findByIdAndUpdate(
          {_id: hotelData.tripId},
          {$push: {hotels: newHotel._id}},
          {new: true}
          ).populate('hotels');
        return updatedTrip;
      }

      throw new AuthenticationError('You needed to be logged in');
    },
    removeFlight: async(parent, {deleteField}, context) => {
      if (context.user){
        
        await Flight.findOneAndDelete({
          _id:deleteField.DeleteId
        });
        const response = await Trip.findOne({
          _id:deleteField.TripId
        }).populate('flights hotels');
        return response;
      }

      throw new AuthenticationError('You needed to be logged in');
    },
    removeHotel: async(parent, {deleteField}, context) => {
      if (context.user){
        await Hotel.findOneAndDelete({
          _id:deleteField.DeleteId
        });
        const response = await Trip.findOne({
          _id:deleteField.TripId
        }).populate('flights hotels');
        return response;
      }

      throw new AuthenticationError('You needed to be logged in');
    },
    removeTrip: async(parent, {id}, context) => {
      if (context.user){
        const result = await Trip.findOneAndDelete({_id:id});
        if(!result){
          response.message= 'No trip with such ID';
          response.error = 404;
        } 
        else {
          response.message = 'Successfully deleted trip'
          // remove flights and hotel related to the trip
          await Flight.deleteMany({_id: {$in: result.flights}});
          await Hotel.deleteMany({_id: {$in: result.hotels}});
        }
        return response;
      }

      throw new AuthenticationError('You needed to be logged in');
    }
  }
};

module.exports = resolvers;
