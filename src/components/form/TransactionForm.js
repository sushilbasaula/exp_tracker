import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { postTransaction } from "../../helpers/axiosHelpers";
import { toast } from "react-toastify";

const initialState = {
  type: "",
  name: "",
  amount: "",
};

const TransactionForm = ({ getTransaction }) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { status, message } = await postTransaction(formData);

    toast[status](message);

    status === "success" && getTransaction();
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row className="mt-3 gap-2">
          <Col md={2}>
            <Form.Select
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Control
              name="name"
              type="text"
              placeholder="Enter transanction name"
              required
              value={formData.name}
              onChange={handleChange}
            ></Form.Control>
          </Col>
          <Col md={5}>
            <Form.Control
              name="amount"
              type="number"
              placeholder="Enter amount"
              required
              value={formData.amount}
              onChange={handleChange}
            />
          </Col>
          <Col md={2}>
            <div className="">
              <Button type="submit">Add</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TransactionForm;
