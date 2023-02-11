import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { REMOVE_TRIP } from "../../utils/mutations";
import moment from "moment";
import FlightSearchForm from "../FlightSearch";
import HotelSearchForm from "../HotelSearch";
import DisplayList from "../DisplayList";
import { Divider, Button } from "semantic-ui-react";

const SingleTrip = ({ trip, tripsData, setUserData, amadeus }) => {
  const { _id, title, startDate, endDate, goal, totalCost, flights, hotels } =
    trip;
  const [searchResult, setSearchResult] = useState([]);
  const [isVisible, setVisible] = useState(false);

  const [removeTrip] = useMutation(REMOVE_TRIP);

  useEffect(() => {
    searchResult.length ? setVisible(true) : setVisible(false);
  }, [searchResult]);

  const handleDeleteTrip = async () => {
    await removeTrip({
      variables: { id: _id },
    });
    const updatedTrips = tripsData.filter((trip) => trip._id !== _id);
    setUserData({ ...tripsData, trips: updatedTrips });
  };

  return (
    <>
      <div className={"card text-left my-4"}>
        <div className={"card-header"}>
          <div className={"d-flex justify-content-between m-0"}>
            <h2 className="SV">{title}</h2>
            <div>
              <Button
                circular
                icon="trash"
                onClick={handleDeleteTrip}
                size="mini"
              />
            </div>
          </div>
          <div className={"d-flex justify-content-between m-0"}>
            <div>
              <span style={{ fontWeight: "bold" }}>Duration: </span>
              {`${moment(startDate, "YYYY MM DD").format("ll")} to ${moment(
                endDate,
                "YYYY MM DD"
              ).format("ll")}`}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Total Cost: </span>{" "}
              {totalCost} AUD
            </div>
          </div>
          {goal ? (
            <p className={"pt-2"}>
              <span style={{ fontWeight: "bold" }}>Goals: </span>
              {goal}
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className={"card-body"}>
          <div className={"row"}>
            <div className={hotels.length > 0 ? "col-12 col-md-6" : "col-12"}>
              {flights.length > 0 && (
                <>
                  <h2 className={"SV m-0"}>Flights:</h2>
                  <DisplayList
                    contentList={flights}
                    tripsData={tripsData}
                    setUserData={setUserData}
                    tripID={_id}
                    className={"p-5"}
                  />
                </>
              )}
            </div>
            <div className={flights.length > 0 ? "col-12 col-md-6" : "col-12"}>
              {hotels.length > 0 && (
                <>
                  <h2 className={"SV m-0"}>Hotels:</h2>
                  <DisplayList
                    contentList={hotels}
                    tripsData={tripsData}
                    setUserData={setUserData}
                    tripID={_id}
                  />
                </>
              )}
            </div>
          </div>

          <Divider horizontal>+ Add to your trip</Divider>
          <div className={"text-center"}>
            <FlightSearchForm
              amadeus={amadeus}
              setSearchResult={setSearchResult}
            />
            <HotelSearchForm
              amadeus={amadeus}
              setSearchResult={setSearchResult}
            />
          </div>

          {isVisible ? (
            <DisplayList
              contentList={searchResult}
              tripsData={tripsData}
              setUserData={setUserData}
              tripID={_id}
              amadeus={amadeus}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleTrip;
