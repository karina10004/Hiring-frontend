import React from "react";
import { Card, Flex, Typography, Form, Input } from "antd";
import { Button } from "antd/es/radio";
import { Link } from "react-router-dom";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
//import { Upload } from 'antd';
import "./Auth.css";
import LoginImage from "../assets/Login.png";

const props = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const CompanyRegister = () => {
  const handleregister = (values) => {
    console.log(values);
  };
  return (
    <Card size="medium" className="form-container">
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
            <Form.Item
              label="Logo"
              name="logo"
              rules={[{ required: true, message: "Please upload the logo" }]}
            >
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload logo</Button>
              </Upload>
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
