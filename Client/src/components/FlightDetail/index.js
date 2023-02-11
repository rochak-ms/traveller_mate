import React, { useState } from "react";
import { Accordion, Icon, Button, Popup } from "semantic-ui-react";
import SingleTrip from "./SingleTrip";
import { durationFormater, timeFormater } from "../../utils/helpers";
import { useMutation } from "@apollo/react-hooks";
import { ADD_FLIGHT } from "../../utils/mutations";

const FlightDetail = ({
  flightResult,
  activeIndex,
  setActiveIndex,
  tripID,
}) => {
  const airlines = require("airline-codes");
  const {
    id,
    itineraries,
    price: { grandTotal, currency } = {},
    validatingAirlineCodes,
  } = flightResult;

  // Saved popup
  const [open, setOpen] = useState(false);

  const handleClick = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  const [addFlight, { error }] = useMutation(ADD_FLIGHT);

  const handleSave = async () => {
    // Create FlightInput for mutation
    const FlightInput = {};
    FlightInput.tripId = tripID;
    FlightInput.duration = durationFormater(itineraries[0].duration);
    FlightInput.airline = airlines
      .findWhere({ iata: validatingAirlineCodes[0] })
      .get("name");
    FlightInput.departure = `${timeFormater(
      itineraries[0].segments[0].departure.at
    )}`;
    if (itineraries[1]) {
      // Check for returning
      FlightInput.duration += `, ${durationFormater(itineraries[1].duration)}`;
      FlightInput.return = `${timeFormater(
        itineraries[1].segments[0].departure.at
      )}`;
    }
    FlightInput.cost = parseInt(grandTotal);
    FlightInput.people = flightResult.travelerPricings.length;

    // Send Mutation
    try {
      const data = await addFlight({
        variables: { flightData: FlightInput },
      });
      // console.log(data);
      setActiveIndex(-1);
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <Accordion.Title
        active={activeIndex === id}
        index={id}
        onClick={handleClick}
      >
        <Icon name="dropdown" />
        {/* Header information */}
        {validatingAirlineCodes.map((code, i) => {
          const airline = airlines.findWhere({ iata: code }).get("name");
          return i === validatingAirlineCodes.length - 1
            ? airline
            : `${airline}, `;
        })}
        {", "}
        {grandTotal} {currency}
      </Accordion.Title>
      <Accordion.Content active={activeIndex === id}>
        {/* Departure and returning */}
        <div className={"row"}>
          <div className={itineraries[1] ? "col-12 col-md-6" : "col-12"}>
            <div className={"d-flex justify-content-between m-0"}>
              <h3>Departure: </h3>
              <p className={"text-right"}>
                {durationFormater(itineraries[0].duration)}{" "}
                {itineraries[0].segments.length === 1
                  ? "Nonstop"
                  : `${itineraries[0].segments.length - 1} stop`}{" "}
              </p>
            </div>

            <SingleTrip itinerary={itineraries[0]} />
          </div>
          {/* Return trip if there's more than 1 intinerary */}
          {itineraries[1] ? (
            <div className={"col-12 col-md-6"}>
              <div className={"d-flex justify-content-between m-0"}>
                <h3>Return: </h3>
                <p className={"text-right"}>
                  {durationFormater(itineraries[1].duration)}{" "}
                  {itineraries[1].segments.length === 1
                    ? "Nonstop"
                    : `${itineraries[1].segments.length - 1} stop`}{" "}
                </p>
              </div>
              <SingleTrip itinerary={itineraries[1]} />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={"text-right"}>
          <Button content={"Save"} onClick={handleSave} />
        </div>
      </Accordion.Content>
    </>
  );
};

export default FlightDetail;
