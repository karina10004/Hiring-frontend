import React, { useState } from "react";
import { Form, Input, DatePicker, Layout, Button, message } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./companydashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import "./AddHiringProcess.css";

const { Header, Sider, Content } = Layout;

const HiringProcessForm = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    numRounds: "",
    startDate: null,
    endDate: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: date,
    }));
  };

  const handleSubmit = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        throw new Error("No access token found");
      }

      const decodedToken = jwtDecode(access_token);
      const companyId = decodedToken.id;
      console.log(formData);
      const response = await axios.post(
        `http://localhost:8000/api/hiring/create/${companyId}`,
        {
          ...formData,
          startDate: formData.startDate.toISOString(),
          endDate: formData.endDate.toISOString(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      message.success("Hiring process created successfully!");
      console.log(response.data);
      navigate(`/manage/${response.data.hiringProcess._id}`);

      setFormData({
        title: "",
        desc: "",
        numRounds: "",
        startDate: null,
        endDate: null,
      });
    } catch (error) {
      console.error("Failed to create hiring process:", error);
      message.error("Failed to create hiring process");
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
          <div className="">
            <Form
              layout="vertical"
              name="hiringProcessForm"
              onFinish={handleSubmit}
              autoComplete="off"
              style={{ maxWidth: 600, margin: "0 auto" }}
              className="form1"
            >
              <Form.Item
                label="Job Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter the job title" },
                ]}
              >
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                label="Description"
                name="desc"
                rules={[
                  { required: true, message: "Please enter a job description" },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                label="Number of Rounds"
                name="numRounds"
                rules={[
                  {
                    required: true,
                    message: "Please enter the number of rounds",
                  },
                ]}
              >
                <Input
                  type="number"
                  name="numRounds"
                  value={formData.numRounds}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[
                  { required: true, message: "Please select a start date" },
                ]}
              >
                <DatePicker
                  name="startDate"
                  value={formData.startDate}
                  onChange={(date) => handleDateChange("startDate", date)}
                />
              </Form.Item>
              <Form.Item
                label="End Date"
                name="endDate"
                rules={[
                  { required: true, message: "Please select an end date" },
                ]}
              >
                <DatePicker
                  name="endDate"
                  value={formData.endDate}
                  onChange={(date) => handleDateChange("endDate", date)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="btn"
                >
                  Create Hiring Process
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HiringProcessForm;
