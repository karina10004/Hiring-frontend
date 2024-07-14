import React from "react";
import { Card, Col, Row, List, Typography, Progress } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

const { Title } = Typography;

const jobListings = [
  { title: "Software Engineer", department: "Engineering", status: "Open" },
  { title: "Product Manager", department: "Product", status: "Open" },
  { title: "UI/UX Designer", department: "Design", status: "Closed" },
];

const recentActivities = [
  {
    activity: "Conducted Hiring for Amazon ",
    time: "2 hours ago",
    icon: <FileTextOutlined />,
  },
  {
    activity: "Conducted Hiring for Google",
    time: "1 day ago",
    icon: <FileTextOutlined />,
  },
  {
    activity: "Conducted Hiring for Myntra",
    time: "3 days ago",
    icon: <FileTextOutlined />,
  },
];

const HomePage = () => (
  <div style={{ padding: 24, background: "#f0f2f5", minHeight: 360 }}>
    <Title level={2} style={{ marginBottom: 24 }}>
      Welcome to the Dashboard!
    </Title>
    <Row gutter={16}>
      <Col span={12}>
        <Card title="Job Listings" bordered={false}>
          <List
            dataSource={jobListings}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={`Department: ${item.department} - Status: ${item.status}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Recent Activities" bordered={false}>
          <List
            dataSource={recentActivities}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.icon}
                  title={item.activity}
                  description={item.time}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
    <Row gutter={16} style={{ marginTop: 24 }}>
      <Col span={12}>
        <Card title="Hiring Progress" bordered={false}>
          <Progress percent={75} status="active" />
          <p>Reduces 75% of the work</p>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Overall Performance" bordered={false}>
          <Progress type="circle" percent={80} />
          <p>Adopted by 80% of the Companies</p>
        </Card>
      </Col>
    </Row>
  </div>
);
export default HomePage;
