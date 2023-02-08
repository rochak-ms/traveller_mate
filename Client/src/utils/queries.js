import gql from 'graphql-tag';

export const QUERY_ME = gql`
  {
    me {
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
        hotels {
          type
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