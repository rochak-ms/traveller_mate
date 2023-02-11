import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { CHECK_USERNAME, CHECK_EMAIL } from "../../utils/mutations";
import { useMutation } from "@apollo/react-hooks";

const UserCheck = ({ type, name, userFormData, setUserFormData }) => {
  // Type is for the label, while name is for the field to be query
  // Once onBlur is triggered, the component will check if the input is valid, and then save into data query
  const [field, setField] = useState("");
  const [error, setError] = useState(false);

  const [checkUsername] = useMutation(CHECK_USERNAME);
  const [checkEmail] = useMutation(CHECK_EMAIL);

  const handleChange = (e, { value }) => {
    setField(value);
    setError(false);
  };

  const handleSave = async () => {
    let check;
    if (type === "Username")
      check = await checkUsername({ variables: { [name]: field } });
    if (type === "Email")
      check = await checkEmail({ variables: { [name]: field } });
    // Server will return a boolean, which is then used to check if the

    if (check.data) {
      const result = check.data.checkUsername || check.data.checkEmail;
      if (!result) setUserFormData({ ...userFormData, [name]: field });
      else setError({ content: `${type} is already in use` });
    }
  };

  return (
    <Form.Input
      fluid
      label={`${type}`}
      placeholder={`${type}`}
      onChange={handleChange}
      onBlur={handleSave}
      error={error}
      value={field}
    />
  );
};

export default UserCheck;
