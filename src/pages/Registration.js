import React, { useState } from "react";
import { MainLayout } from "../components/mainLayout/MainLayout";
import { Container, Form, Button, Row, Col } from "react-bootstrap/";
import { CustomField } from "../components/mainLayout/customField/CustomField";
import { toast } from "react-toastify";
import { postUser } from "../helpers/axiosHelpers";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  pin: "",
  confirmPin: "",
};
const Registration = () => {
  const [form, setForm] = useState(initialState);

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (value && (name === "pin" || name === "confirmPin")) {
      if (!+value) {
        return alert("Only number allowed");
      }
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPin, ...rest } = form;
    if (confirmPin !== rest.pin) {
      toast.error("Pins do not match");
    }
    const { status, message } = await postUser(rest);
    toast[status](message);

    status === "success" && navigate("/");
  };

  const fields = [
    {
      label: "Full Name",
      placeholder: "Sam Smith",
      name: "name",
      required: true,
      value: form.name,
      //   forwaredref: emailRef,
    },
    {
      label: "Email",
      placeholder: "sam@emial.com",
      name: "email",
      type: "email",
      required: true,
      value: form.email,
      //   forwaredref: emailRef,
    },
    {
      label: "Pin",
      placeholder: "1234",
      name: "pin",
      type: "password",
      required: true,
      minLength: "4",
      maxLength: "4",
      value: form.pin,
      //   forwaredref: pinRef,
    },
    {
      label: "Confirm Pin",
      placeholder: "1234",
      name: "confirmPin",
      type: "password",
      required: true,
      minLength: "4",
      maxLength: "4",
      value: form.confirmPin,
      //   forwaredref: pinRef,
    },
  ];
  return (
    <MainLayout>
      <Container className="mt-5 pt-5">
        <Row className="login-page shadow-lg">
          <Col className="bg-primary d-none d-md-flex  direction-column justify-content-center align-items-center ">
            {" "}
            <div className="info  p-2 pt-5 text-white text-center ">
              <h1>🙏Welcome to our system!</h1>
              <p className="mt-5">
                Login to your account and manage your daily transactions
              </p>
            </div>
          </Col>
          <Col className="p-5">
            <div className="form">
              <h2 className="text-primary">
                <i class="fa-solid fa-file-pen"></i> Register{" "}
              </h2>
              <hr />
              <Form onSubmit={handleOnSubmit}>
                {fields.map((item, i) => (
                  <CustomField key={i} {...item} onChange={handleOnChange} />
                ))}
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Register
                  </Button>
                </div>
              </Form>
              <div className="text-end">
                Have an account already <Link to="/">Login Now</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};
export default Registration;
