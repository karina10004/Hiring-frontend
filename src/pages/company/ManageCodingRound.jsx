import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  message,
  Modal,
  List,
  Select,
  Layout,
  Divider,
} from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import Sidebar from "./companydashboard/Dashboard";
import "./ManageCodingRound.css";

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const ManageCodingRound = () => {
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [testCases, setTestCases] = useState([
    { input: "", expectedOutput: "", isHidden: false },
  ]);
  const [currentQuestionId, setCurrentQuestionId] = useState(null); // Track the current question being edited

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/question/getall/${id}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        message.error("Failed to fetch questions");
      }
    };

    fetchQuestions();
  }, [id]);

  const showModal = () => {
    form.resetFields(); // Reset form fields when showing modal
    setTestCases([{ input: "", expectedOutput: "", isHidden: false }]);
    setIsModalVisible(true);
    setCurrentQuestionId(null); // Reset current question id
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const questionData = {
        ...values,
        testcases: testCases,
      };

      if (currentQuestionId) {
        // Update existing question
        const response = await axios.put(
          `http://localhost:8000/api/question/update/${currentQuestionId}`,
          questionData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const updatedQuestionIndex = questions.findIndex(
          (q) => q._id === currentQuestionId
        );
        if (updatedQuestionIndex !== -1) {
          const updatedQuestions = [...questions];
          updatedQuestions[updatedQuestionIndex] = response.data;
          setQuestions(updatedQuestions);
        }
        message.success("Question updated successfully!");
      } else {
        // Add new question
        const response = await axios.post(
          `http://localhost:8000/api/question/create/${id}`,
          questionData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setQuestions([...questions, response.data]);
        message.success("Question added successfully!");
      }

      form.resetFields();
      setTestCases([{ input: "", expectedOutput: "", isHidden: false }]);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to add/update question:", error);
      message.error("Failed to add/update question");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setTestCases([{ input: "", expectedOutput: "", isHidden: false }]);
    setCurrentQuestionId(null);
  };

  const handleAddTestCase = () => {
    setTestCases([
      ...testCases,
      { input: "", expectedOutput: "", isHidden: false },
    ]);
  };

  const handleRemoveTestCase = (index) => {
    const newTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(newTestCases);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  const handleEditQuestion = (questionId) => {
    const questionToEdit = questions.find((q) => q._id === questionId);
    if (questionToEdit) {
      form.setFieldsValue({
        title: questionToEdit.title,
        desc: questionToEdit.desc,
        constraints: questionToEdit.constraints,
        example: questionToEdit.example,
        languages: questionToEdit.languages,
        timeLimit: questionToEdit.timeLimit,
        memoryLimit: questionToEdit.memoryLimit,
      });
      setTestCases(questionToEdit.testcases);
      setCurrentQuestionId(questionId);
      setIsModalVisible(true);
    }
  };

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
            icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger-btn"
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Title level={2}>Manage Coding Round</Title>
          <Button type="primary" onClick={showModal}>
            Add Question
          </Button>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={questions}
            renderItem={(question) => (
              <List.Item>
                <Card
                  title={question.title}
                  extra={
                    <Button
                      type="link"
                      onClick={() => handleEditQuestion(question._id)}
                    >
                      Edit
                    </Button>
                  }
                  style={{ marginBottom: "16px" }}
                >
                  <div>
                    <p>{question.desc}</p>
                    <p>
                      <strong>Constraints:</strong> {question.constraints}
                    </p>
                    <p>
                      <strong>Example:</strong> {question.example}
                    </p>
                    <p>
                      <strong>Languages:</strong>{" "}
                      {question.languages.join(", ")}
                    </p>
                    <p>
                      <strong>Time Limit:</strong> {question.timeLimit} ms
                    </p>
                    <p>
                      <strong>Memory Limit:</strong> {question.memoryLimit} KB
                    </p>
                    <Divider>Test Cases</Divider>
                    <ul>
                      {question.testcases.map((testcase, index) => (
                        <li key={index}>
                          <p>
                            <strong>Input:</strong> {testcase.input}
                          </p>
                          <p>
                            <strong>Expected Output:</strong>{" "}
                            {testcase.expectedOutput}
                          </p>
                          <p>
                            <strong>Hidden:</strong>{" "}
                            {testcase.isHidden ? "Yes" : "No"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </List.Item>
            )}
          />
          <Modal
            title={
              currentQuestionId
                ? "Edit Programming Question"
                : "Add Programming Question"
            }
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            okText={currentQuestionId ? "Update" : "Add"}
            cancelText="Cancel"
            bodyStyle={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <Form form={form} layout="vertical" name="questionForm">
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter the title" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="desc"
                rules={[
                  { required: true, message: "Please enter the description" },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                label="Constraints"
                name="constraints"
                rules={[
                  { required: true, message: "Please enter the constraints" },
                ]}
              >
                <TextArea rows={2} />
              </Form.Item>
              <Form.Item
                label="Example"
                name="example"
                rules={[{ required: true, message: "Please enter an example" }]}
              >
                <TextArea rows={2} />
              </Form.Item>
              <Form.Item
                label="Languages"
                name="languages"
                rules={[
                  {
                    required: true,
                    message: "Please select at least one language",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select programming languages"
                >
                  <Option value="c++">C++</Option>
                  <Option value="java">Java</Option>
                  <Option value="python">Python</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Time Limit (ms)"
                name="timeLimit"
                rules={[
                  { required: true, message: "Please enter the time limit" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Memory Limit (KB)"
                name="memoryLimit"
                rules={[
                  { required: true, message: "Please enter the memory limit" },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Divider>Test Cases</Divider>
              {testCases.map((testCase, index) => (
                <div key={index} className="test-case-item">
                  <Form.Item
                    label={`Test Case ${index + 1} - Input`}
                    rules={[
                      { required: true, message: "Please enter the input" },
                    ]}
                  >
                    <Input
                      value={testCase.input}
                      onChange={(e) =>
                        handleTestCaseChange(index, "input", e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label={`Test Case ${index + 1} - Expected Output`}
                    rules={[
                      {
                        required: true,
                        message: "Please enter the expected output",
                      },
                    ]}
                  >
                    <Input
                      value={testCase.expectedOutput}
                      onChange={(e) =>
                        handleTestCaseChange(
                          index,
                          "expectedOutput",
                          e.target.value
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <label>Hidden</label>
                    <Select
                      value={testCase.isHidden}
                      onChange={(value) =>
                        handleTestCaseChange(index, "isHidden", value)
                      }
                    >
                      <Option value={true}>Yes</Option>
                      <Option value={false}>No</Option>
                    </Select>
                  </Form.Item>
                  <Button
                    type="danger"
                    onClick={() => handleRemoveTestCase(index)}
                    icon={<MinusCircleOutlined />}
                  >
                    Remove Test Case
                  </Button>
                  {index < testCases.length - 1 && <Divider />}
                </div>
              ))}
              <Button type="dashed" onClick={handleAddTestCase}>
                Add Test Case
              </Button>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageCodingRound;
