import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

import { REMOVE_HOTEL } from "../../utils/mutations";
import { Accordion, Icon, Button } from "semantic-ui-react";

const HotelMin = ({
  savedDetail,
  activeIndex,
  setActiveIndex,
  id,
  tripsData,
  setUserData,
  tripID,
}) => {
  const { _id, name, startDate, endDate, cost, rooms } = savedDetail;
  const [removeHotel] = useMutation(REMOVE_HOTEL);

  const handleClick = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const handleDelete = async () => {
    const response = await removeHotel({
      variables: {
        deleteField: {
          DeleteId: _id,
          TripId: tripID,
        },
      },
    });
    setActiveIndex(-1);
  };

  return (
    <>
      <section className="cont" active={activeIndex === id} index={id}>
        <div className="row1">
          <article className="card1 fl-left">
            <section className="date">
              <time>
                <span>{rooms} </span>
                <span>Rooms{rooms > 1 ? " rooms" : "room"}</span>
              </time>
            </section>
            <section className="card-cont">
              <small>{tripID}</small>
              <h3>
                {name}, ${cost} AUD
              </h3>
              <div className="even-date">
                <i className="fa fa-calendar"></i>
                {/* <time>
                  <span> Check-in date: {startDate.slice(0, -9)}</span>
                  <span> Check-out date: {endDate.slice(0, -9)}</span>
                </time> */}
              </div>
              <div className="even-info"></div>
              <a onClick={handleDelete}>Delete</a>
            </section>
          </article>
        </div>
      </section>
    </>
  );
};

export default HotelMin;
