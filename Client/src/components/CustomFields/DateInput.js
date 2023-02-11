import React, { useState } from "react";
import moment from "moment";
import { Form } from "semantic-ui-react";

const DateInput = ({ type, name, searchData, setSearchData, isRequired }) => {
  // Type is for the label, while name is for the field to be query
  // Once onBlur is triggered, the component will check if the input is valid, and then save into data query
  const [date, setDate] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e, { value }) => {
    setDate(value);
    setError(false);
  };

  const handleSave = () => {
    const inputDate = moment(date, "DD-MM-YYYY");
    if (inputDate.isValid())
      setSearchData({ ...searchData, [name]: inputDate.format("YYYY-MM-DD") });
    else {
      if (isRequired || date) {
        setError({ content: "Please enter a valid date" });
        if (isRequired) setSearchData({ ...searchData, [name]: false });
        // If required, set it to false for easy error checking
      } else {
        // If the field is empty or invalid and not required, remove the property so that it doesn't interfere with the query
        let temp = searchData;
        delete temp[name];
        setSearchData(temp);
      }
    }
  };

  return (
    <Form.Input
      fluid
      label={`${type} date`}
      value={date}
      placeholder="DD-MM-YYYY"
      onChange={handleChange}
      onBlur={handleSave}
      error={error}
      required={isRequired ? true : false}
    />
  );
};

export default DateInput;
