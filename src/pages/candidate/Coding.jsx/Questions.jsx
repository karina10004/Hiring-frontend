import React, { useState, useEffect } from "react";
import { Layout, Breadcrumb, Typography, List, Card, Row, Col } from "antd";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import "./Question.css";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { processId, id } = useParams(); // Get the coding round ID from the URL
  const [codingRound, setCodingRound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCodingRound = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/codinground/get/${processId}/${id}`
        );
        setCodingRound(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCodingRound();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Show an error message if fetching data fails
  }

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
          <Title level={2}>Coding Round - {codingRound.title}</Title>
          <Paragraph>
            Here is the detailed information about the coding round and the list
            of questions. Click on a question to start coding.
          </Paragraph>
          <Card>
            <Row gutter={16}>
              <Col span={12}>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {dayjs(codingRound.startDate).format("YYYY-MM-DD HH:mm")}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {dayjs(codingRound.endDate).format("YYYY-MM-DD HH:mm")}
                </p>
              </Col>
              <Col span={12}>
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={codingRound.questions}
                  renderItem={(question, index) => (
                    <List.Item
                      key={question}
                      extra={
                        <Link to={`/question/${question}`}>Start Coding</Link>
                      }
                    >
                      <List.Item.Meta
                        title={
                          <Link to={`/question/${question}`}>{`Question ${
                            index + 1
                          }`}</Link>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Code Editor ©2024 Created by Your Name
      </Footer>
    </Layout>
  );
};

export default HomePage;
