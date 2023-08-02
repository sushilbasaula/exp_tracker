import React from "react";
import { MainLayout } from "../component/mainLayout/MainLayout";
import { Container, Form, Button, Row, Col } from "react-bootstrap/";
import { CustomField } from "../component/mainLayout/customField/CustomField";

const Login = () => {
  const fields = [
    {
      label: "Email",
      placeholder: "sam@emial.com",
      name: "email",
      type: "email",
      required: true,
      //   forwaredref: emailRef,
    },
    {
      label: "Pin",
      placeholder: "*******",
      name: "pin",
      type: "password",
      required: true,
      //   forwaredref: pinRef,
    },
  ];
  return (
    <MainLayout>
      <Container className="mt-5 pt-5">
        <Row className="login-page shadow-lg">
          <Col className="bg-primary d-none d-md-flex  direction-column justify-content-center align-items-center ">
            {" "}
            <div className="info  p-2 pt-5 ">
              <h1>Welcome back!</h1>
              <p className="mt-5">
                Login to your account and manage your daily transactions
              </p>
            </div>
          </Col>
          <Col className="p-5">
            <div className="form">
              <h2 className="text-primary">
                <i class="fa-solid fa-file-pen"></i> Login{" "}
              </h2>
              <hr />
              <Form>
                {fields.map((item, i) => (
                  <CustomField key={i} {...item} />
                ))}
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};
export default Login;
