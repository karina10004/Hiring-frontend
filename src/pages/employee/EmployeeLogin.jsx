import React, { useState } from "react";
import { Form, Input, Button, message, Layout, Typography } from "antd";
import "./EmployeeLogin.css";
const { Header, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const [loading, setLoading] = useState(false);
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
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
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
