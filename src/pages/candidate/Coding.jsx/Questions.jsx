import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Card,
  Button,
  Row,
  Col,
  Typography,
  Select,
  Switch,
  Collapse,
  message,
  Divider,
  Input,
  List,
} from "antd";
import MonacoEditor from "react-monaco-editor";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import "./Editor.css";
import { runCodeOnJudge0, submitCodeToJudge0 } from "./submission";
const { Header, Content, Footer, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("c++");
  const [darkTheme, setDarkTheme] = useState(false);
  const [question, setQuestion] = useState(null);
  const [outputs, setOutputs] = useState([]);
  const [compileOutput, setCompileOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const languageIds = {
    python: 71,
    cpp: 54,
    java: 91,
  };
  const createUpdateSubmission = async (score, testCasesPassed, result) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/submission/create",
        {
          userId: userId,
          questionId: id,
          code,
          language,
          result,
          testCasesPassed,
          totalTestCases: question.testcases.length,
          score,
        }
      );
      message.success("Submission saved");
      console.log("Submission created:", response.data);
    } catch (error) {
      console.error("Failed to create submission:", error);
      message.error("Failed to run code.");
    }
  };
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const type = jwtDecode(access_token).type;
    const userid = jwtDecode(access_token).id;
    if (type != "candidate") {
      message.warning("You need to be a candidate to access this page");
      navigate("/login");
    }
    if (!userid) {
      message.warning("You need to be a login to access this page");
      navigate("/login");
    }
    setUserId(jwtDecode(access_token).id);

    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/question/get/${id}`
        );
        setQuestion(response.data);
      } catch (error) {
        // message.error("Failed to fetch question data.");
        console.error("Error fetching question data:", error);
      }
    };
    fetchQuestion();
  }, [id]); // Re-fetch the question if the ID changes

  const handleRunCode = async () => {
    try {
      const results = await runCodeOnJudge0(
        code,
        languageIds[language],
        question.testcases,
        question.score
      );
      // const results = {
      //   results: [
      //     {
      //       stdout: "as",
      //       status: {
      //         id: 3,
      //         description: "Accepted",
      //       },
      //       compile_output: null,
      //       id: "667aab054b8541a3dec8b82c",
      //     },
      //     {
      //       stdout: "as",
      //       status: {
      //         id: 4,
      //         description: "Wrong Answer",
      //       },
      //       compile_output: null,
      //       id: "667aab054b8541a3dec8b82d",
      //     },
      //   ],
      //   score: 0,
      //   testCasesPassed: 1,
      // };
      console.log(results);
      createUpdateSubmission(results.score, results.testCasesPassed, "pass");
      handleResponse(results.results);
    } catch (error) {
      setOutput(error.toString());
    }
  };

  const handleSubmitCode = async () => {
    const results = await submitCodeToJudge0(
      code,
      languageIds[language],
      question.testcases,
      question.score
    );
    // const results = {
    //   results: [
    //     {
    //       stdout: "as",
    //       status: {
    //         id: 3,
    //         description: "Accepted",
    //       },
    //       compile_output: null,
    //       id: "667aab054b8541a3dec8b82c",
    //     },
    //     {
    //       stdout: "as",
    //       status: {
    //         id: 4,
    //         description: "Wrong Answer",
    //       },
    //       compile_output: null,
    //       id: "667aab054b8541a3dec8b82d",
    //     },
    //   ],
    //   score: 0,
    //   testCasesPassed: 1,
    // };
    console.log(results);
    handleResponse(results.results);
    createUpdateSubmission(results.score, results.testCasesPassed, "pass");
    message.success("Code submitted successfully!");
  };
  const handleClearEditor = () => {
    setCode("");
    setOutput("");
  };
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };
  const handleLanguageChange = (value) => {
    setLanguage(value);
  };
  const handleThemeChange = (checked) => {
    setDarkTheme(checked);
  };
  const handleResponse = (responses) => {
    const outputData = responses.map((response) => ({
      id: response.id,
      stdout: response.stdout,
      status: response.status.description,
      compile_output: response.compile_output || "",
    }));
    setOutputs(outputData);
    const hasCompileError = responses.some(
      (response) => response.status.id !== 3
    );
    if (hasCompileError) {
      setCompileOutput("Compilation Error: Please check your code.");
    } else {
      setCompileOutput("");
    }
  };
  return (
    <Layout className="layout" style={{ background: "#fff" }}>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Editor</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={300} className="site-layout-background">
          <div className="question-panel">
            {question ? (
              <>
                <Title level={4}>{question.title}</Title>
                <Paragraph>
                  <Text strong>Description:</Text>
                  <br />
                  {question.desc}
                </Paragraph>
                <Divider />
                <Paragraph>
                  <Text strong>Constraints:</Text>
                  <br />
                  {question.constraints}
                </Paragraph>
                <Divider />
                <Paragraph>
                  <Text strong>Example:</Text>
                  <br />
                  {question.example}
                </Paragraph>
                <Divider />
                <Paragraph>
                  <Text strong>Languages Supported:</Text>
                  <br />
                  {question.languages.join(", ")}
                </Paragraph>
                <Divider />
                <Paragraph>
                  <Text strong>Time Limit:</Text>
                  <br />
                  {question.timeLimit} ms
                </Paragraph>
                <Divider />
                <Paragraph>
                  <Text strong>Memory Limit:</Text>
                  <br />
                  {question.memoryLimit} KB
                </Paragraph>
                <Divider />
                <Collapse style={{ marginTop: 16 }}>
                  <Panel header="Test Cases" key="1">
                    {question.testcases.map(
                      (testCase, index) =>
                        !testCase.isHidden && (
                          <Card key={index} style={{ marginBottom: 10 }}>
                            <Text strong>Input:</Text> {testCase.input} <br />
                            <Text strong>Expected Output:</Text>{" "}
                            {testCase.expectedOutput} <br />
                            {testCase.isHidden && (
                              <Text type="secondary">(Hidden Test Case)</Text>
                            )}
                          </Card>
                        )
                    )}
                  </Panel>
                </Collapse>
              </>
            ) : (
              <Text>Loading question...</Text>
            )}
          </div>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Editor</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-content"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Card title="Code Editor">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ marginBottom: 20 }}
                  >
                    <Col>
                      <Select
                        placeholder="Select Language"
                        style={{ width: 120, marginRight: 10 }}
                        onChange={handleLanguageChange}
                      >
                        <Option value="python">Python</Option>
                        <Option value="java">Java</Option>
                        <Option value="cpp">C++</Option>
                      </Select>
                    </Col>
                    <Col>
                      <Button
                        onClick={handleClearEditor}
                        style={{ marginRight: 10 }}
                      >
                        Clear Editor
                      </Button>
                      <Switch
                        checked={darkTheme}
                        onChange={handleThemeChange}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                      />
                    </Col>
                  </Row>
                  <MonacoEditor
                    width="100%"
                    height="600px"
                    language={language}
                    theme={darkTheme ? "vs-dark" : "vs-light"}
                    value={code}
                    options={{
                      selectOnLineNumbers: true,
                    }}
                    onChange={handleCodeChange}
                  />
                </Col>
                <Col span={24} style={{ marginTop: 20 }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Button
                        type="primary"
                        onClick={handleRunCode}
                        style={{ marginRight: "10px" }}
                      >
                        Run Code
                      </Button>
                      <Button type="primary" onClick={handleSubmitCode}>
                        Submit Code
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Title level={4}>Output</Title>
                  <div style={{ marginTop: "20px" }}>
                    {outputs.length > 0 &&
                      outputs.map((output) => (
                        <Card key={output.id} style={{ marginBottom: "20px" }}>
                          <List
                            header={
                              <Text strong>Test Case ID: {output.id}</Text>
                            }
                            dataSource={output.stdout}
                            renderItem={(item, index) => (
                              <List.Item>
                                <Typography.Text strong>
                                  Test Case {index + 1}:
                                </Typography.Text>{" "}
                                {item}
                              </List.Item>
                            )}
                          />
                        </Card>
                      ))}
                    {compileOutput && (
                      <Card title="Compile Output">
                        <Paragraph>{compileOutput}</Paragraph>
                      </Card>
                    )}
                  </div>
                </Col>
              </Row>
            </Card>
          </Content>
        </Layout>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Code Editor ©2024 Created by Your Name
      </Footer>
    </Layout>
  );
};
export default CodeEditor;
