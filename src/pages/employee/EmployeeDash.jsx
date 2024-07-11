import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  ScheduleOutlined,
  LoginOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const EmployeeDash = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ color: "white" }}>
        <Title level={3} style={{ color: "white", margin: 0 }}>
          Employee Portal
        </Title>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<ScheduleOutlined />}>
              Schedule Interview
            </Menu.Item>
            <Menu.Item key="3" icon={<LoginOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          ></Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default EmployeeDash;
