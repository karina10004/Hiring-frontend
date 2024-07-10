import React, { useState } from "react";

import { Card, Typography, Form, Input, Button, message } from "antd";

import axios from "axios";

import "./AddEmployee.css";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",

    position: "",

    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleadd = async () => {
    try {
      const data = {
        name: formData.name,

        position: formData.position,

        email: formData.email,
      };

      const response = await axios.post(
        "http://localhost:8000/api/companyemployee",

        data,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      message.success(response.data.message);
    } catch (error) {
      console.log(error);

      message.error("Add Employee Failed");
    }
  };

  return (
    <Card className="form-container">
      <div className="flex-container">
        <div className="flex-vertical">
          <Typography.Title level={3} strong className="title">
            Add Employee
          </Typography.Title>
          <Form layout="vertical">
            <Form.Item
              label="Employee Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "please input the name of Employee",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item
              label="Position"
              name="position"
              rules={[
                {
                  required: true,
                  message: "please input position",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter position of employee"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "please enter email",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter email address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="btn"
                onClick={handleadd}
              >
                Add Employee
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Card>
  );
};

export default AddEmployee;
