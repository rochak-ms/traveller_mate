import React, { useState } from "react";
import { Form, Button, Message, Modal, Rating } from "semantic-ui-react";
import AirportSearch from "../CustomFields/ArportSearch";
import DateInput from "../CustomFields/DateInput";
import NumberInput from "../CustomFields/NumberInput";

const HotelSearchForm = ({ amadeus, setSearchResult }) => {
  const [searchData, setSearchData] = useState({
    // radius: "20",
    // currencyCode: "AUD",
  });
  // The object that'll hold all the query parameter. Preset to at most 20km away from airport
  const [isLoading, setLoading] = useState(false);
  // State to display if the form is loading

  const [error, setError] = useState(false);
  const [noResult, setNoResult] = useState(false);
  // States to let user knows if there's any error

  const [open, setOpen] = useState(false); // For Modal

  const inlineStyle = {
    modal: {
      height: "auto",
      top: "auto",
      left: "auto",
      bottom: "auto",
      right: "auto",
    },
  };

  const handleSubmit = () => {
    if (searchData.cityCodes) {
      setLoading(true);
      amadeus.referenceData.recommendedLocations
        .get(searchData)
        .then(({ data }) => {
          // clean up duplicate price options, as the API has sorted the cheapest with shortest travel time option first
          // duplicate option is redundant
          setLoading(false);

          if (data.length) {
            setSearchResult(data);
            setError(false);
            setNoResult(false);
            setOpen(false);
          } else setNoResult(true);
        })
        .catch((responseError) => {
          setLoading(false);
          setError(true);
        });
      // }
      console.log(searchData);
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      style={inlineStyle.modal}
      trigger={<Button className="btn-cust">Search a Hotel</Button>}
    >
      <Modal.Content className="createCont">
        <Form className="formC" loading={isLoading}>
          <AirportSearch
            type={"Arrival"}
            name={"cityCodes"}
            searchData={searchData}
            setSearchData={setSearchData}
            amadeus={amadeus}
          />
          {/* <Form.Group widths="equal">
            <DateInput
              type={"Check in"}
              name={"checkInDate"}
              searchData={searchData}
              setSearchData={setSearchData}
            />
            <DateInput
              type={"Check out"}
              name={"checkOutDate"}
              searchData={searchData}
              setSearchData={setSearchData}
              
          //   /> */}
          {/* // </Form.Group> */}

          {/* <NumberInput type={'Maximum distance from airport (miles)'} name = {'radius'}
                        searchData={searchData} setSearchData={setSearchData}
                        isRequired/> */}
          {/*         
          //     type={"Number of guests"}
          //     name={"adults"}
          //     searchData={searchData}
          //     setSearchData={setSearchData}
              
          //   />
          //   <NumberInput */}
          {/* //     type={"Number of rooms"}
          //     name={"roomQuantity"}
          //     searchData={searchData}
          //     setSearchData={setSearchData}
              
          //   /> */}

          {/* <Form.Group widths='equal'> */}
          {/* <div style={{fontWeight: 'bold', marginBottom:'10px'}}>Minimum rating: <Rating icon='star' defaultRating={1} maxRating={5} onRate={handleRate}/></div> */}
          {error ? (
            <Message
              negative
              header="Bad Request"
              content="Please check your request"
            />
          ) : (
            <></>
          )}
          {noResult ? (
            <Message
              negative
              header="No matches"
              content="There's no hotel offer that matches your criteria"
            />
          ) : (
            <></>
          )}
          <Form.Field control={Button} color={"blue"} onClick={handleSubmit}>
            Submit
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default HotelSearchForm;
