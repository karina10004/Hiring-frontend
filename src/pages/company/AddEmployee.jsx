import React, { useState } from "react";
import { Card, Typography, Form, Input, Button, message, Layout } from "antd";
import axios from "axios";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./companydashboard/Dashboard";
import "./AddEmployee.css";
const { Header, Sider, Content } = Layout;
const AddEmployee = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    email: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAdd = async () => {
    try {
      const data = {
        name: formData.name,
        position: formData.position,
        email: formData.email,
      };
      const access_token = localStorage.getItem("access_token");
      const companyId = jwtDecode(access_token).id;
      const response = await axios.post(
        `http://localhost:8000/api/companyemployee/create/${companyId}`,
        { ...data, companyId: companyId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      message.success(response.data.message);
      setFormData({
        name: "",
        position: "",
        email: "",
      });
    } catch (error) {
      console.log(error);
      message.error("Add Employee Failed");
    }
  };

  return (
    <Layout className="layout-container">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
        className="sider"
      >
        <div className="logo" />
        <Sidebar />
      </Sider>
      <Layout className="content-layout">
        <Content className="content">
          <Card className="card-container">
            <div className="form-container">
              <div className="form-content">
                <Typography.Title level={3} className="form-title">
                  Add Employee
                </Typography.Title>
                <Form layout="vertical" className="form">
                  <Form.Item
                    label="Employee Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input the name of the employee",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input
                      size="large"
                      placeholder="Enter your full name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Position"
                    name="position"
                    rules={[
                      {
                        required: true,
                        message: "Please input position",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input
                      size="large"
                      placeholder="Enter position of employee"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter email",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input
                      size="large"
                      placeholder="Enter email address"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input.Password placeholder="Password" className="input" />
                  </Form.Item>
                  <Form.Item className="form-item">
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      className="submit-btn"
                      onClick={handleAdd}
                    >
                      Add Employee
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AddEmployee;
