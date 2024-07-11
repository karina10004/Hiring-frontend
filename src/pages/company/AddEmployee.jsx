import React, { useState } from "react";
import { Card, Typography, Form, Input, Button, message, Layout } from "antd";
import axios from "axios";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./companydashboard/Dashboard"; // Adjust the import path as needed
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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
      >
        <div className="logo" />
        <Sidebar />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger-btn"
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
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
