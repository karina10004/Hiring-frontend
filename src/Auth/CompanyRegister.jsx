import React, { useState } from "react";
import {
  Card,
  Flex,
  Typography,
  Form,
  Input,
  Button,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    username: "",
    password: "",
    location: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleregister = async () => {
    try {
      const data = {
        name: formData.name,
        desc: formData.desc,
        username: formData.username,
        password: formData.password,
        location: formData.location,
        logoUrl: "www.example.com/png",
      };

      // const response = await axios.post(
      //   "http://localhost:8000/api/company/register",
      //   data,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // message.success(response.data.message);
      navigate("/companylogin");
    } catch (error) {
      console.log(error);
      message.error("Registration failed");
    }
  };
  return (
    <Card size="medium" className="form-container">
      <Flex gap="large" align="center">
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Register Company
          </Typography.Title>
          <Form layout="vertical" autoComplete="off">
            <Form.Item
              label="Name"
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
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              label="Description"
              name="desc"
              rules={[
                {
                  required: true,
                  message: "Please input your description",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your description"
                name="desc"
                value={formData.desc}
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
                  message: "Please input your Password",
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
              label="Location"
              name="location"
              rules={[
                {
                  required: true,
                  message: "Please input your location",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
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
                htmlType="button"
                size="large"
                className="btn"
                onClick={handleregister}
              >
                Create Account
              </Button>
            </Form.Item>
            <Form.Item>
              <Link to="/companylogin">
                <Button className="btn">Sign in</Button>
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

export default CompanyRegister;
