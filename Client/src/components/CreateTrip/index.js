import React, { useState } from "react";
import { Form, Button, TextArea, Modal, Input } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import DateInput from "../CustomFields/DateInput";
import { ADD_TRIP } from "../../utils/mutations";
import "./createTrip.css";

const TripForm = ({ userData, setUserData }) => {
  const [tripData, setTripData] = useState({});
  const [isLoading, setLoading] = useState(false);

  const [open, setOpen] = useState(false); // For Modal

  const [createTrip, { error }] = useMutation(ADD_TRIP);

  const inlineStyle = {
    modal: {
      height: "500px",
      top: "auto",
      left: "auto",
      bottom: "auto",
      right: "auto",
      maxWidth: "auto",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tripData.title && tripData.endDate && tripData.startDate) {
      setLoading(true);
      try {
        const {
          data: { addTrip },
        } = await createTrip({
          variables: { tripData: tripData },
        });
        setLoading(false);
        setOpen(false);
        // console.log(addTrip);
        setUserData({ ...userData, ...addTrip });
      } catch (err) {
        alert("Something went wrong");
      }
    }
  };
  const handleInput = (event) => {
    const { name, value } = event.target;
    setTripData({ ...tripData, [name]: value });
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      style={inlineStyle.modal}
      trigger={<Button className={"btn-cust ad_trip"}> + Add Trip</Button>}
    >
      <Modal.Content className="createCont">
        <Form className="formC" loading={isLoading}>
          <Form.Field
            className="Createfield"
            control={Input}
            label="Trip name"
            name={"title"}
            required
            placeholder="Where do you want to go?"
            onChange={handleInput}
          />
          <Form.Group widths="equal">
            <DateInput
              type={"Begins at"}
              name={"startDate"}
              searchData={tripData}
              setSearchData={setTripData}
              isRequired
            />
            <DateInput
              type={"Ends at"}
              name={"endDate"}
              searchData={tripData}
              setSearchData={setTripData}
              isRequired
            />
          </Form.Group>
          <Form.Field
            control={TextArea}
            label="Goals"
            name={"goal"}
            placeholder="What do you want to do?"
            onChange={handleInput}
          />
          {/* {showAlert?(<Message negative content='Please check your creditials'/>):(<></>)} */}
          <Form.Field
            fluid
            control={Button}
            color={"blue"}
            onClick={handleSubmit}
          >
            Submit
          </Form.Field>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default TripForm;
