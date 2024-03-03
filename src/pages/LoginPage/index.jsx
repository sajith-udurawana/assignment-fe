import _ from "lodash";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Panel, Schema } from "rsuite";
import Swal from "sweetalert2";
import { useLoginMutation } from "../../store/api/authApi";
const formModel = Schema.Model({
  email: Schema.Types.StringType()
    .isRequired("Email is required!")
    .isEmail("Should be a valid email!"),
  password: Schema.Types.StringType().isRequired("Password is required!"),
});
function LoginPage() {
  const [login, { data, isLoading, error }] = useLoginMutation();
  const [formValue, setFormValue] = useState({});
  const formRef = useRef();
  const navigate = useNavigate();
  const handleLogin = () => {
    if (formRef.current?.check()) {
      const credentials = { ...formValue };
      login(credentials)
        .unwrap()
        .then((res) => {
          const token = _.get(res, "token");
          if (token) {
            localStorage.setItem("authToken", token);
            navigate("/");
          } else {
            throw new Error(_.get(res, "error"));
          }
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: `Error: ${error.message}`,
            icon: "error",
          });
        });
    }
  };
  return (
    <React.Fragment>
      <div className="container-fluid bg-dark">
        <div className="d-flex vh-100 justify-content-center align-items-center">
          <Panel
            className="bg-white"
            header={<div className="fs-3 fw-bold text-muted">Login</div>}
            bordered
            shaded
          >
            <Form
              model={formModel}
              ref={formRef}
              formValue={formValue}
              onChange={setFormValue}
            >
              <Form.Group>
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control
                  name="email"
                  placeholder="(Required)"
                  type="email"
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Password</Form.ControlLabel>
                <Form.Control
                  placeholder="(Required)"
                  name="password"
                  type="password"
                />
              </Form.Group>
              <Button block appearance="primary" onClick={handleLogin}>
                Login
              </Button>
            </Form>
          </Panel>
        </div>
      </div>
    </React.Fragment>
  );
}
export default LoginPage;
