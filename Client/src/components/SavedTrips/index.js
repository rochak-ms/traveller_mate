import React, { useState, useEffect } from "react";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import CreateTrip from "../CreateTrip";
import { Loader, Divider } from "semantic-ui-react";
import SingleTrip from "../SingleTrip";

const SavedTrips = ({ amadeus }) => {
  const { loading, data } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Check if data is avaliable
    if (data) {
      const { me } = data;
      setUserData({ ...userData, ...me });
    }
  }, [data]);

  // useEffect(()=>{
  //     console.log(userData);
  // })
  if (loading || !userData.trips) return <Loader active inline="centered" />;

  return (
    <>
      {userData.trips.map((trip) => {
        return (
          <SingleTrip
            tripsData={userData.trips}
            setUserData={setUserData}
            trip={trip}
            amadeus={amadeus}
            key={trip._id}
          />
        );
      })}
      {userData.trips.length ? <Divider className="py-2" /> : <></>}
      <CreateTrip userData={userData} setUserData={setUserData} />
    </>
  );
};

export default SavedTrips;
