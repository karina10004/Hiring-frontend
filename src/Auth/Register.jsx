import React from "react";
import { Card, Flex, Typography, Form, Input } from "antd";
import { Button } from "antd/es/radio";
import { Link } from "react-router-dom";
import registerImage from "../assets/register.png";
import "./Auth.css";
const Register = () => {
  const handleregister = (values) => {
    console.log(values);
  };
  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Create an account
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "please input your email",
                },
                {
                  type: "emails",
                  message: "The input is not valid email",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email address" />
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
              label="Password"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: "please input your Confirm Password",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder=" Re-enter your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="btn"
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
          <img src={registerImage} className="auth-image" />
        </Flex>
      </Flex>
    </Card>
  );
};
export default Register;
