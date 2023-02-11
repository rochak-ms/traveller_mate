import React, { useState } from "react";
import { Form, Button, Message, Modal, Input } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./login.css";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    password: "",
  });

  // set loginUser as mutation
  const [loginUser, loginError] = useMutation(LOGIN);

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
      width: "305px",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser({
        variables: { ...userFormData },
      });

      const token = response.data.login.token;
      // console.log(token);
      Auth.login(token);
      setOpen(false);
    } catch (err) {
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
      trigger={<Button className="btn-cust"> Login</Button>}
    >
      <Modal.Content>
        <Form loading={isLoading}>
          <div className="form-heading">
            <h1>Login</h1>
          </div>

          <Form.Field
            control={Input}
            label="Username"
            name="username"
            onChange={handleInput}
            placeholder="Username"
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
              header="Bad Request"
              content="Please check your creditials"
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
