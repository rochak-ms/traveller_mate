import React from "react";
import { durationFormater, timeFormater } from "../../utils/helpers";
const airports = require("airport-codes");

const SingleTrip = ({ itinerary }) => {
  const { segments: flights } = itinerary;
  return (
    <>
      {flights.map((flight) => {
        const { carriers, departure, arrival, duration, id } = flight;
        return (
          <div key={`flight_${id}`} className={"card"}>
            <div>
              {timeFormater(departure.at)}{" "}
              {`${airports
                .findWhere({ iata: departure.iataCode })
                .get("name")} (${departure.iataCode})`}
              {departure.terminal ? `, terminal: ${departure.terminal}` : ""}
            </div>
            <div> Travel time: {durationFormater(duration)}</div>
            <div>
              {timeFormater(arrival.at)}{" "}
              {`${airports
                .findWhere({ iata: arrival.iataCode })
                .get("name")} (${arrival.iataCode})`}
              {arrival.terminal ? `, terminal: ${arrival.terminal}` : ""}
            </div>
            <div>Aircraft code: {carriers} </div>
          </div>
        );
      })}
    </>
  );
};

export default SingleTrip;
