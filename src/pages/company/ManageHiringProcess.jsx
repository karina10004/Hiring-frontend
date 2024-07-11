import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Layout,
  Button,
  message,
  Modal,
  Table,
} from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Sidebar from "./companydashboard/Dashboard";
import { useParams } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const ManageHiringProcess = () => {
  const { id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    numRounds: "",
    startDate: null,
    endDate: null,
  });
  const [hiringProcess, setHiringProcess] = useState({});
  const [codingRounds, setCodingRounds] = useState([]);
  const [interviewRounds, setInterviewRounds] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalForm] = Form.useForm();
  const fetchHiringProcess = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const companyId = jwtDecode(access_token).id;
      const response = await axios.get(
        `http://localhost:8000/api/hiring/get/${companyId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const hiringData = response.data;
      setHiringProcess(hiringData);
      setFormData({
        title: hiringData.title,
        desc: hiringData.desc,
        numRounds: hiringData.numRounds,
        startDate: hiringData.startDate,
        endDate: hiringData.endDate,
      });
      const codingRoundDetails = await Promise.all(
        hiringData.codingRounds.map(async (roundId) => {
          const roundResponse = await axios.get(
            `http://localhost:8000/api/codinground/get/${id}/${roundId}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          return roundResponse.data;
        })
      );
      const interviewRoundDetails = await Promise.all(
        hiringData.interviewRounds.map(async (roundId) => {
          const roundResponse = await axios.get(
            `http://localhost:8000/api/interviewround/get/${id}/${roundId}`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
          return roundResponse.data;
        })
      );
      setCodingRounds(codingRoundDetails);
      setInterviewRounds(interviewRoundDetails);
    } catch (error) {
      console.error("Failed to fetch hiring process:", error);
      message.error("Failed to fetch hiring process");
    }
  };
  useEffect(() => {
    fetchHiringProcess();
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDateChange = (name, date) => {
    setFormData({ ...formData, [name]: date });
  };
  const handleUpdate = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const companyId = jwtDecode(access_token).id;
      await axios.put(
        `http://localhost:8000/api/hiring/update/${companyId}/${id}`,
        { ...formData, registrationLink: hiringProcess.registrationLink },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      message.success("Hiring process updated successfully!");
    } catch (error) {
      console.error("Failed to update hiring process:", error);
      message.error("Failed to update hiring process");
    }
  };
  const showModal = (type) => {
    setModalType(type);
    setIsModalVisible(true);
  };
  const handleModalOk = async () => {
    try {
      const values = await modalForm.validateFields();
      const access_token = localStorage.getItem("access_token");
      const companyId = jwtDecode(access_token).id;
      if (modalType === "coding") {
        await axios.post(
          `http://localhost:8000/api/codinground/create/${id}`,
          { ...values, hiringProcessId: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        message.success("Coding round added successfully!");
      } else if (modalType === "interview") {
        await axios.post(
          `http://localhost:8000/api/interviewround/create/${id}`,
          { ...values, hiringProcessId: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        message.success("Interview round added successfully!");
      }
      // Refetch the hiring process to update the round lists
      await fetchHiringProcess();
      setIsModalVisible(false);
      modalForm.resetFields();
    } catch (error) {
      console.error("Failed to add round:", error);
      message.error("Failed to add round");
    }
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
    modalForm.resetFields();
  };
  const codingRoundColumns = [
    {
      title: "Number of Questions",
      dataIndex: "numQuestions",
      key: "numQuestions",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
  ];
  const interviewRoundColumns = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Duration (minutes)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Interview Type",
      dataIndex: "type",
      key: "type",
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
          <div className="">
            <Form
              layout="vertical"
              name="hiringProcessForm"
              onFinish={handleUpdate}
              autoComplete="off"
            >
              <Form.Item
                label="Job Title"
                name="title"
                rules={[
                  { required: true, message: "Please enter the job title" },
                ]}
                initialValue={formData.title}
              >
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                label="Description"
                name="desc"
                rules={[
                  { required: true, message: "Please enter a job description" },
                ]}
                initialValue={formData.desc}
              >
                <Input.TextArea
                  rows={4}
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                label="Number of Rounds"
                name="numRounds"
                rules={[
                  {
                    required: true,
                    message: "Please enter the number of rounds",
                  },
                ]}
                initialValue={formData.numRounds}
              >
                <Input
                  type="number"
                  name="numRounds"
                  value={formData.numRounds}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[
                  { required: true, message: "Please select a start date" },
                ]}
                initialValue={formData.startDate}
              >
                <DatePicker
                  name="startDate"
                  value={formData.startDate}
                  onChange={(date) => handleDateChange("startDate", date)}
                />
              </Form.Item>
              <Form.Item
                label="End Date"
                name="endDate"
                rules={[
                  { required: true, message: "Please select an end date" },
                ]}
                initialValue={formData.endDate}
              >
                <DatePicker
                  name="endDate"
                  value={formData.endDate}
                  onChange={(date) => handleDateChange("endDate", date)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="rounds-section">
            <div className="rounds-header">
              <h2>Coding Rounds</h2>
              <Button type="primary" onClick={() => showModal("coding")}>
                Add Coding Round
              </Button>
            </div>
            <Table
              dataSource={codingRounds}
              columns={codingRoundColumns}
              rowKey="id"
            />
          </div>
          <div className="rounds-section">
            <div className="rounds-header">
              <h2>Interview Rounds</h2>
              <Button type="primary" onClick={() => showModal("interview")}>
                Add Interview Round
              </Button>
            </div>
            <Table
              dataSource={interviewRounds}
              columns={interviewRoundColumns}
              rowKey="id"
            />
          </div>
        </Content>
      </Layout>
      <Modal
        title={`Add ${modalType === "coding" ? "Coding" : "Interview"} Round`}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={modalForm} layout="vertical">
          {modalType === "coding" && (
            <>
              <Form.Item
                label="Number of Questions"
                name="numQuestions"
                rules={[
                  {
                    required: true,
                    message: "Please enter number of questions",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Start Time"
                name="startTime"
                rules={[
                  { required: true, message: "Please select start time" },
                ]}
              >
                <Input type="time" />
              </Form.Item>
              <Form.Item
                label="End Time"
                name="endTime"
                rules={[{ required: true, message: "Please select end time" }]}
              >
                <Input type="time" />
              </Form.Item>
            </>
          )}
          {modalType === "interview" && (
            <>
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[
                  { required: true, message: "Please select start date" },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required: true, message: "Please select end date" }]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Duration (minutes)"
                name="duration"
                rules={[
                  {
                    required: true,
                    message: "Please enter duration in minutes",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="Interview Type"
                name="type"
                rules={[
                  { required: true, message: "Please enter interview type" },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </Layout>
  );
};
export default ManageHiringProcess;
