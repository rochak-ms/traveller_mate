import React, { useState } from "react";
import { Form, Button, Message, Modal, Input } from "semantic-ui-react";
import "./signup.css";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../../utils/mutations";
import SignUpCheck from "../CustomFields/signUpCheck";
import Auth from "../../utils/auth";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // set signupUser as mutation
  const [signupUser, loginError] = useMutation(ADD_USER);

  const [isLoading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  // using error to show alert, check only when there's an error
  // useEffect(() => {
  //     if (error) setShowAlert(true);
  //     else setShowAlert(false);
  // }, [loginError]);

  const [open, setOpen] = useState(false); // For Modal

  const inlineStyle = {
    modal: {
      height: "auto",
      top: "auto",
      left: "auto",
      bottom: "auto",
      right: "auto",
      width: "350px",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(userFormData);
    setLoading(true);
    try {
      const response = await signupUser({
        variables: { ...userFormData },
      });

      const token = response.data.addUser.token;
      // console.log(token);
      Auth.login(token);
      setOpen(false);
    } catch (err) {
      // console.log(err);
      setLoading(false);
      setShowAlert(true);
    }
  };
  const handleInput = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      style={inlineStyle.modal}
      trigger={
        <button className="cta">
          <span>Signup</span>
          <svg viewBox="0 0 13 10" height="10px" width="15px">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      }
    >
      <Modal.Content>
        <Form loading={isLoading}>
          <div className="form-heading2">
            <h1>SignUp</h1>
          </div>
          <SignUpCheck
            type="Username"
            name="username"
            userFormData={userFormData}
            setUserFormData={setUserFormData}
          />
          <SignUpCheck
            type="Email"
            name="email"
            userFormData={userFormData}
            setUserFormData={setUserFormData}
          />
          <Form.Field
            control={Input}
            label="Password"
            name="password"
            type={"password"}
            onChange={handleInput}
            placeholder="Password"
          />
          {showAlert ? (
            <Message
              negative
              header="Signup failed"
              content="Please try again"
            />
          ) : (
            <></>
          )}
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

export default LoginForm;
