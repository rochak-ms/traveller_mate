import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const CHECK_USERNAME = gql`
  mutation checkUsername($username: String!) {
    checkUsername(username:$username)
  }
`;
export const CHECK_EMAIL = gql`
  mutation checkEmail($email: String!) {
    checkEmail(email:$email)
  }
`;

export const ADD_TRIP = gql`
  mutation addTrip($tripData: TripInput!){
    addTrip (tripData:$tripData) {
      _id
      username
      email
      trips {
        _id
        title
        startDate
        endDate
        goal
        totalCost
        flights{
          _id
          airline
          departure
          return
          stops
          duration
          cost
          people
        }
        hotels {
          _id
          name
          startDate
          endDate
          cost
          rooms
        }
      }
    }
  }
`;
export const REMOVE_TRIP = gql`
  mutation removeTrip($id: ID!){
    removeTrip (id:$id) {
    message
    error
    }
  }
`
export const REMOVE_FLIGHT = gql`
  mutation removeFlight($deleteField: DeleteForm!){
    removeFlight (deleteField:$deleteField) {
      _id
      totalCost
      flights{
        type
        _id
        airline
        departure
        return
        stops
        duration
        cost
        people
      }
    }
  }
`
export const REMOVE_HOTEL = gql`
  mutation removeHotel($deleteField: DeleteForm!){
    removeHotel (deleteField:$deleteField) {
      _id
      totalCost
      hotels {
        _id
        name
        startDate
        endDate
        cost
        rooms
      }
    }
  }
`
 export const ADD_FLIGHT = gql`
 mutation addFlight($flightData: FlightInput!){
  addFlight (flightData:$flightData) {
    _id
      
      totalCost
      flights{
        type
        _id
        airline
        departure
        return
        stops
        duration
        cost
        people
      }
      
  }
}
`

export const ADD_HOTEL = gql`
mutation addHotel($hotelData: HotelInput!){
  addHotel (hotelData:$hotelData) {
    _id
    
    totalCost
      hotels {
      _id
      type
      name
      startDate
      endDate
      cost
      rooms
    }
  }
}
`