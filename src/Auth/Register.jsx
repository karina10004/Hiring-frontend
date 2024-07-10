import React, { useState } from "react";
import { Card, Flex, Typography, Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import registerImage from "../assets/register.png";
import "./Auth.css";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRegister = async () => {
    try {
      if (formData.password !== formData.passwordConfirm) {
        message.error("Passwords do not match");
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/api/candidate/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      message.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      message.error(error.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="style">
      <Card className="form-container">
        <Flex gap="large" align="center">
          <Flex vertical flex={1}>
            <Typography.Title level={3} strong className="title">
              Create an account
            </Typography.Title>
            <Form layout="vertical" autoComplete="off">
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your full name",
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
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
                  },
                  {
                    type: "email",
                    message: "The input is not a valid email",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your email address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="passwordConfirm"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter your password"
                  name="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="button" // Use type="button" to prevent form submission
                  size="large"
                  className="btn"
                  onClick={handleRegister}
                >
                  Create Account
                </Button>
              </Form.Item>
              <Form.Item>
                <Link to="/login">
                  <Button className="btn">Sign In</Button>
                </Link>
              </Form.Item>
            </Form>
          </Flex>
          <Flex flex={1}>
            <img src={registerImage} className="auth-image" alt="Register" />
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default Register;
