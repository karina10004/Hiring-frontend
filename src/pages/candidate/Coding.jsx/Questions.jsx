import React from "react";
import { Layout, Menu, Breadcrumb, Typography, List } from "antd";
import { Link } from "react-router-dom";
import "./Question.css";
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const questions = [
  {
    id: 1,
    title: "Example Question 1",
    description: "Write a function that returns the sum of two numbers.",
  },
  {
    id: 2,
    title: "Example Question 2",
    description: "Write a function to reverse a string.",
  },
  {
    id: 3,
    title: "Example Question 3",
    description: "Implement a stack using arrays.",
  },
];

const HomePage = () => {
  return (
    <Layout className="layout">
      <Header></Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{ background: "#fff", padding: 24, minHeight: 280 }}
        >
          <Title level={2}>Question Bank</Title>
          <Paragraph>Choose a question below to start coding.</Paragraph>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={questions}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                extra={<Link to={`/editor/${item.id}`}>Start Coding</Link>}
              >
                <List.Item.Meta
                  title={<Link to={`/editor/${item.id}`}>{item.title}</Link>}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Code Editor ©2024 Created by Your Name
      </Footer>
    </Layout>
  );
};

export default HomePage;
