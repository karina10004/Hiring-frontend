import React from "react";
import { Card, Flex, Typography, Form, Input } from "antd";
import { Button } from "antd/es/radio";
import { Link } from "react-router-dom";
import "./Auth.css";
import LoginImage from "../assets/Login.png";
const CompanyRegister = () => {
  const handleregister = (values) => {
    console.log(values);
  };
  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Register Company
          </Typography.Title>
          <Form layout="vertical" onFinish={handleregister} autoComplete="off">
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "please input your full name",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="description"
              name="desc"
              rules={[
                {
                  required: true,
                  message: "please input your description",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your description" />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "please input your username",
                },
                {
                  type: "string",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your usename" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "please input your Password",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>
            <Form.Item
              label="logo"
              name="logo"
              rules={[
                {
                  required: true,
                  message: "please upload the logo",
                },
                {
                  type: "file",
                },
              ]}
            >
              <Input size="large" placeholder="upload logo" />
            </Form.Item>

            <Form.Item
              label="location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "please input your location",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your location" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="btn"
              >
                Sign in
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/">
                <Button className="btn">Create a Account</Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
        <Flex flex={1}>
          <img src={LoginImage} className="auth-image" />
        </Flex>
      </Flex>
    </Card>
  );
};

export default CompanyRegister;
