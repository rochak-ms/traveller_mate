import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { REMOVE_FLIGHT } from "../../utils/mutations";
import { Accordion, Button } from "semantic-ui-react";
const FlightMin = ({
  savedDetail,
  activeIndex,
  setActiveIndex,
  id,
  tripsData,
  setUserData,
  tripID,
}) => {
  const {
    _id,
    airline,
    departure,
    return: returning,
    duration,
    cost,
    people,
  } = savedDetail;
  const [removeFlight] = useMutation(REMOVE_FLIGHT);

  const handleClick = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const handleDelete = async () => {
    await removeFlight({
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
      {/* <div className={"card text-left p-0 " }>
            <div className={"card-header"}>
                <div className={"d-flex justify-content-between m-0"}>
                    <h3>{airline}</h3>
                    <div>
                        <Button circular icon='trash' onClick={handleDelete}/>
                    </div>
                </div>
            </div>
            <div className={"card-body"}>
                <p>Departing on: {departure}</p>
                <p>Returning on: {returning} </p>
                <p>Flight duration: {duration}</p>
                <div>{people} passenger{people>1?'s':''}</div>
            </div>
        </div> */}
      {/* <Card fluid>
            <Card.Content header className={"d-flex justify-content-between m-0"}>
                <h2>{airline} {cost}</h2>
                    <Button circular icon='trash' onClick={handleDelete}/>
            </Card.Content>
            <CardContent description>
                
            </CardContent>
        </Card> */}
      {/* <Accordion.Title
        active={activeIndex === id}
        index={id}
        onClick={handleClick}
        className={"p-0"}
      >
        <div className={"card-header bg-primary py-2"}>
          <div className={"d-flex justify-content-between m-0"}>
            <h3 className={"m-0 pt-1"}>
              {airline}, {cost} AUD
            </h3>
            <div>
              <Button
                circular
                icon="trash"
                onClick={handleDelete}
                size="mini"
              />
            </div>
          </div>
        </div>
      </Accordion.Title>
      <Accordion.Content active={activeIndex === id}>
        <div className={"card-body p-0"}>
          <p>Departing on: {departure}</p>
          {returning && <p>Returning on: {returning} </p>}
          <p>Flight duration: {duration}</p>
          <p>
            {people} passenger{people > 1 ? "s" : ""}
          </p>
        </div>
      </Accordion.Content> */}
      <section className="cont" active={activeIndex === id} index={id}>
        <Accordion.Title
          active={activeIndex === id}
          index={id}
          onClick={handleClick}
          className={"p-0"}
        >
          <div className={"card-header py-2"}>
            <div className={"d-flex justify-content-between m-0"}>
              <h3 className={"m-0 pt-1"}>
                {airline}, {cost} AUD
              </h3>
              <div>
                <Button
                  circular
                  icon="trash"
                  onClick={handleDelete}
                  size="mini"
                />
              </div>
            </div>
          </div>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === id}>
          <div className={"card-body p-0"}>
            <p>Departing on: {departure}</p>
            {returning && <p>Returning on: {returning} </p>}
            <p>Flight duration: {duration}</p>
            <p>
              {people} passenger{people > 1 ? "s" : ""}
            </p>
          </div>
        </Accordion.Content>
        <div className="row1">
          <article className="card1 fl-left">
            <section className="date">
              <time>
                <span>{people}</span>
                <span>passenger{people > 1 ? "s" : ""}</span>
              </time>
            </section>
            <section className="card-cont">
              <small>{tripID}</small>
              <h3>
                {airline}, ${cost} AUD
              </h3>
              <div className="even-date">
                <i className="fa fa-calendar"></i>
                <time>
                  <span> {departure}</span>
                  <span> {returning}</span>
                </time>
              </div>
              <div className="even-info "></div>
              <a clasName="bt" onClick={handleDelete}>
                delete
              </a>
            </section>
          </article>
        </div>
      </section>
    </>
  );
};

export default FlightMin;
