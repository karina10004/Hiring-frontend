import React, { useState, useEffect } from "react";
import { Card, Col, Row, Timeline, Button, message } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CandidateHome = () => {
  const [hiringProcess, setHiringProcess] = useState(null);
  const [codingRounds, setCodingRounds] = useState([]);
  const [interviewRounds, setInterviewRounds] = useState([]);
  const { companyId, processId } = useParams();
  useEffect(() => {
    const fetchHiringProcess = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/hiring/get/${companyId}/${processId}`
        );
        setHiringProcess(response.data);
        fetchCodingRounds(response.data.codingRounds);
        fetchInterviewRounds(response.data.interviewRounds);
      } catch (error) {
        console.error("Error fetching hiring process:", error);
        message.error("error fetching the hiring process");
      }
    };

    const fetchCodingRounds = async (codingRoundIds) => {
      try {
        const promises = codingRoundIds.map(async (id) => {
          const response = await axios.get(
            `http://localhost:8000/api/codinground/get/${processId}/${id}`
          );
          return response.data;
        });
        const rounds = await Promise.all(promises);
        setCodingRounds(rounds);
      } catch (error) {
        console.error("Error fetching coding rounds:", error);
        // Handle error state or alert user
      }
    };

    const fetchInterviewRounds = async (interviewRoundIds) => {
      try {
        const promises = interviewRoundIds.map(async (id) => {
          const response = await axios.get(
            `http://localhost:8000/api/interviewround/get/${processId}/${id}`
          );
          return response.data;
        });
        const rounds = await Promise.all(promises);
        setInterviewRounds(rounds);
      } catch (error) {
        console.error("Error fetching interview rounds:", error);
        // Handle error state or alert user
      }
    };

    fetchHiringProcess();
  }, [companyId, processId]);

  if (!hiringProcess) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  return (
    <div className="hiring-process-container">
      <Card className="hiring-process-header">
        <h2>{hiringProcess.title}</h2>
        <p>{hiringProcess.desc}</p>
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Basic Information">
            <p>
              <strong>Number of Rounds:</strong> {hiringProcess.numRounds}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {dayjs(hiringProcess.startDate).format("YYYY-MM-DD HH:mm")}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {dayjs(hiringProcess.endDate).format("YYYY-MM-DD HH:mm")}
            </p>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Timeline">
            <Timeline className="timeline-container">
              <Timeline.Item dot={<ClockCircleOutlined />} color="green">
                <p>
                  <strong>Process Start:</strong>{" "}
                  {dayjs(hiringProcess.startDate).format("YYYY-MM-DD HH:mm")}
                </p>
              </Timeline.Item>
              {codingRounds.map((round, index) => (
                <Timeline.Item key={round._id} color="blue">
                  <p>
                    <strong>Coding Round {index + 1}</strong>
                  </p>
                  <p>
                    <strong>Number of Questions:</strong>{" "}
                    {round.questions.length}
                  </p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {dayjs(round.startDate).format("YYYY-MM-DD HH:mm")}
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    {dayjs(round.endDate).format("YYYY-MM-DD HH:mm")}
                  </p>
                  <Button type="primary">
                    <Link to={`/assessment/${processId}/${round._id}`}>
                      Go to Assessment
                    </Link>
                  </Button>
                </Timeline.Item>
              ))}
              {interviewRounds.map((round, index) => (
                <Timeline.Item key={round._id} color="red">
                  <p>
                    <strong>
                      Interview Round {index + 1} ({round.type})
                    </strong>
                  </p>
                  <p>
                    <strong>Duration:</strong> {round.duration} minutes
                  </p>
                  <p>
                    <strong>Start Date:</strong>{" "}
                    {dayjs(round.startDate).format("YYYY-MM-DD HH:mm")}
                  </p>
                  <p>
                    <strong>End Date:</strong>{" "}
                    {dayjs(round.endDate).format("YYYY-MM-DD HH:mm")}
                  </p>
                  <p>
                    <strong>Interviewers:</strong>{" "}
                    {round.interviewers.join(", ")}
                  </p>
                  <Button type="primary">
                    <Link to={`/interview/${round._id}`}>Go to interview</Link>
                  </Button>
                </Timeline.Item>
              ))}
              <Timeline.Item dot={<ClockCircleOutlined />} color="green">
                <p>
                  <strong>Process End:</strong>{" "}
                  {dayjs(hiringProcess.endDate).format("YYYY-MM-DD HH:mm")}
                </p>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default CandidateHome;
