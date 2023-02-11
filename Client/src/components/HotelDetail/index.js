import React, { useState } from "react";
import { Accordion, Icon, Button, Popup } from "semantic-ui-react";
import { timeFormater } from "../../utils/helpers";
import { useMutation } from "@apollo/react-hooks";
import { ADD_HOTEL } from "../../utils/mutations";

const HotelDetail = ({
  hotelResult,
  activeIndex,
  setActiveIndex,
  id,
  tripID,
}) => {
  const {
    hotel: { name, rating, contact, hotelDistance },
    offers,
  } = hotelResult;
  const {
    price: { total, currency },
  } = offers[0];

  // Temporary popup
  const [open, setOpen] = useState(false);

  const [addHotel, { error }] = useMutation(ADD_HOTEL);

  const handleClick = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };
  const handleSave = async () => {
    // Create HotelInput for mutation
    const HotelInput = {};
    HotelInput.tripId = tripID;
    HotelInput.name = name;
    HotelInput.startDate = timeFormater(hotelResult.offers[0].checkInDate);
    HotelInput.endDate = timeFormater(hotelResult.offers[0].checkOutDate);
    HotelInput.cost = parseInt(total);
    HotelInput.rooms = parseInt(hotelResult.offers[0].roomQuantity);
    if (!HotelInput.rooms) HotelInput.rooms = 1;
    // Send Mutation
    try {
      const data = await addHotel({
        variables: { hotelData: HotelInput },
      });
      setActiveIndex(-1);

      // console.log(data);
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
        {name} {total} {currency}
      </Accordion.Title>
      <Accordion.Content active={activeIndex === id}>
        {/* Departure and returning */}
        <p>{hotelDistance.distance}km away from airport</p>
        <p>Rating: {rating} star</p>
        <p>Phone: {contact.phone}</p>
        <p>Fax: {contact.fax}</p>
        <div className={"text-right"}>
          <Button content={"Save"} onClick={handleSave} />
        </div>
      </Accordion.Content>
    </>
  );
};

export default HotelDetail;
