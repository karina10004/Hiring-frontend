import React, { useState, useEffect } from "react";
import { Table, Button, message, Layout, Typography, Select } from "antd";
import axios from "axios";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "./companydashboard/Dashboard";
import { useParams } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const CodingRoundScores = () => {
  const { roundId, hiringId } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({});
  const fetchData = async () => {
    try {
      const registrationResponse = await axios.get(
        `http://localhost:8000/api/register/get/${hiringId}`
      );
      setRegistrations(registrationResponse.data.listRegistrations);
      setCandidates(registrationResponse.data.candidates);
      const questionResponse = await axios.get(
        `http://localhost:8000/api/codinground/get/${hiringId}/${roundId}`
      );
      const questions = questionResponse.data.questions;
      const submissions = await Promise.all(
        questions.map(async (questionId) => {
          const submissionResponse = await axios.get(
            `http://localhost:8000/api/submission/getall/${questionId}`
          );
          return submissionResponse.data;
        })
      );
      setSubmissions(submissions.flat());
    } catch (error) {
      console.error("Failed to fetch data:", error);
      message.error("Failed to fetch data");
    }
  };
  useEffect(() => {
    fetchData();
  }, [roundId, hiringId]);
  const calculateScores = () => {
    const candidateScores = registrations
      .filter((registration) => registration.status === "registered")
      .map((registration) => {
        const candidateId = registration.candidateId;
        const candidate = candidates.find((c) => c._id === candidateId);
        const totalScore = submissions
          .filter((submission) => submission.userId === candidateId)
          .reduce((acc, submission) => {
            console.log(
              `Adding score ${submission.score} for candidate ${candidateId}`
            );
            return acc + submission.score;
          }, 0);

        return {
          key: candidateId,
          candidateId,
          candidateName: candidate ? candidate.name : "Unknown",
          candidateEmail: candidate ? candidate.email : "Unknown",
          totalScore,
        };
      });
    return candidateScores;
  };

  let scores = calculateScores();
  console.log("Calculated Scores:", scores);

  const handleResultChange = (candidateId, result) => {
    setResults((prevResults) => ({
      ...prevResults,
      [candidateId]: result,
    }));
  };
  const handleSaveResults = async () => {
    setLoading(true);
    try {
      await Promise.all(
        Object.entries(results).map(async ([candidateId, result]) => {
          await axios.post(`http://localhost:8000/api/result/create`, {
            candidateId,
            roundId,
            roundType: "coding",
            score: 0,
            feedback: result,
            status: result,
          });
          await axios.put(`http://localhost:8000/api/register/update/status`, {
            candidateId,
            hiringId,
            status: result,
          });
        })
      );
      console.log(results);
      fetchData();
      scores = calculateScores();
      message.success("Results saved successfully!");
    } catch (error) {
      console.error("Failed to save results:", error);
      message.error("Failed to save results");
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "candidateName",
      key: "candidateName",
    },
    {
      title: "Email",
      dataIndex: "candidateEmail",
      key: "candidateEmail",
    },
    {
      title: "Total Score",
      dataIndex: "totalScore",
      key: "totalScore",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Select
          defaultValue={results[record.candidateId] || "Select"}
          style={{ width: 120 }}
          onChange={(value) => handleResultChange(record.candidateId, value)}
        >
          <Option value="Pass">Pass</Option>
          <Option value="Fail">Fail</Option>
        </Select>
      ),
    },
  ];
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
          <Title level={3} style={{ margin: "16px 0" }}>
            Coding Round Scores
          </Title>
          <Table
            columns={columns}
            dataSource={scores}
            rowKey="candidateId"
            pagination={false}
          />
          <Button
            type="primary"
            onClick={handleSaveResults}
            loading={loading}
            style={{ marginTop: 16 }}
          >
            Save Results
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
};
export default CodingRoundScores;
