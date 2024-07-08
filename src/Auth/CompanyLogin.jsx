import React from "react";
import { Card, Flex, Typography, Form, Input } from "antd";
import { Button } from "antd/es/radio";
import { Link } from "react-router-dom";
import LoginImage from "../assets/Login.png";
import "./Auth.css";
const CompanyLogin = () => {
  const handleregister = (values) => {
    console.log(values);
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
          <Form layout="vertical" onFinish={handleregister} autoComplete="off">
            <Form.Item
              label="full Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "please input your full name",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your full name" />
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

export default CompanyLogin;
