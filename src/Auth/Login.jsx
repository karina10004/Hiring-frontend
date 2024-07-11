import React, { useState } from "react";
import { Card, Flex, Typography, Form, Input, message } from "antd";
import { Button } from "antd/es/radio";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginImage from "../assets/Login.png";
import "./Auth.css";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/candidate/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      message.success(response.data.message);

      const registrationToken = localStorage.getItem("registrationToken");
      if (registrationToken) {
        const candidateId = response.data._id;
        const registerResponse = await axios.post(
          `http://localhost:8000/api/register/${registrationToken}/${candidateId}`
        );
        console.log("Registration response:", registerResponse.data);
        localStorage.removeItem("registrationToken");
      }

      navigate("/candidate");
    } catch (error) {
      console.error("Login failed:", error);
      message.error(error.response?.data?.msg || "Login failed");
    }
  };
  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Login
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Join for exclusive access
          </Typography.Text>
          <Form layout="vertical" autoComplete="off">
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
                  message: "The input is not valid email",
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="button"
                size="large"
                className="btn"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/">
                <Button className="btn">Create an Account</Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
        <Flex flex={1}>
          <img src={LoginImage} className="auth-image" alt="Login" />
        </Flex>
      </Flex>
    </Card>
  );
};
export default Login;
