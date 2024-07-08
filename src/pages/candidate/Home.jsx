import React from "react";
import { Card, Col, Row, Timeline } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./Home.css";

const dummyData = {
  title: "Software Engineer Hiring Process",
  desc: "This is a detailed description of the hiring process for the Software Engineer position.",
  numRounds: 5,
  startDate: "2024-01-01T09:00:00",
  endDate: "2024-02-01T18:00:00",
  codingRounds: [
    {
      numQuestions: 5,
      startDate: "2024-01-05T10:00:00",
      endDate: "2024-01-10T16:00:00",
      questions: [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5",
      ],
    },
  ],
  interviewRounds: [
    {
      startDate: "2024-01-15T14:00:00",
      endDate: "2024-01-15T15:00:00",
      duration: 60,
      type: "Technical",
      interviewers: ["Interviewer 1", "Interviewer 2"],
    },
    {
      startDate: "2024-01-20T11:00:00",
      endDate: "2024-01-20T11:30:00",
      duration: 30,
      type: "HR",
      interviewers: ["HR 1"],
    },
  ],
};

const CandidateHome = () => {
  return (
    <div className="hiring-process-container">
      <Card className="hiring-process-header">
        <h2>{dummyData.title}</h2>
        <p>{dummyData.desc}</p>
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="Basic Information">
            <p>
              <strong>Number of Rounds:</strong> {dummyData.numRounds}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {dayjs(dummyData.startDate).format("YYYY-MM-DD HH:mm")}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {dayjs(dummyData.endDate).format("YYYY-MM-DD HH:mm")}
            </p>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Timeline">
            <Timeline className="timeline-container">
              <Timeline.Item dot={<ClockCircleOutlined />} color="green">
                <p>
                  <strong>Process Start:</strong>{" "}
                  {dayjs(dummyData.startDate).format("YYYY-MM-DD HH:mm")}
                </p>
              </Timeline.Item>
              {dummyData.codingRounds.map((round, index) => (
                <Timeline.Item key={index} color="blue">
                  <p>
                    <strong>Coding Round {index + 1}</strong>
                  </p>
                  <p>
                    <strong>Number of Questions:</strong> {round.numQuestions}
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
                    <Link to={`/assessment/${index + 1}`}>
                      Go to Assessment
                    </Link>
                  </Button>
                </Timeline.Item>
              ))}
              {dummyData.interviewRounds.map((round, index) => (
                <Timeline.Item key={index} color="red">
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
                </Timeline.Item>
              ))}
              <Timeline.Item dot={<ClockCircleOutlined />} color="green">
                <p>
                  <strong>Process End:</strong>{" "}
                  {dayjs(dummyData.endDate).format("YYYY-MM-DD HH:mm")}
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
