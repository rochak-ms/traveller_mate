import React, { useState } from "react";
import { Form } from "semantic-ui-react";

const NumberInput = ({ type, name, searchData, setSearchData, isRequired }) => {
  // Type is for the label, while name is for the field to be query
  // Once onBlur is triggered, the component will check if the input is valid, and then save into data query
  const [count, setCount] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (e, { value }) => {
    setCount(value);
    setError(false);
  };

  const handleSave = () => {
    if (!isNaN(parseInt(count))) {
      setSearchData({ ...searchData, [name]: parseInt(count) });
    } else {
      if (isRequired || count) {
        setError({ content: "Please enter a valid number" });
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
      label={`${type}`}
      value={count}
      placeholder="Enter a number"
      onChange={handleChange}
      onBlur={handleSave}
      error={error}
      required={isRequired ? true : false}
    />
  );
};

export default NumberInput;
