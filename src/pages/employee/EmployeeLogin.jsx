import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Layout, Typography } from "antd";
import axios from "axios";
import "./EmployeeLogin.css";

const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/companyemployee/login",
        {
          email: values.email,
          password: values.password,
        }
      );
      message.success("Login successful");
      localStorage.setItem("access_token", response.data.token);
      const processId = localStorage.getItem("processId");
      const interviewId = localStorage.getItem("interviewId");
      if (processId && interviewId) {
        navigate(`/interview/admin/${processId}/${interviewId}`);
      } else {
        message.error("visit a interview link and then try to login again");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error(
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <Title level={3} style={{ color: "white" }}>
          Employee Login
        </Title>
      </Header>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          name="login"
          style={{ width: 300 }}
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" type="email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className=".custom-button"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
export default App;
