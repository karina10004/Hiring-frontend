import React, { useState, useEffect } from "react";
import { DatePicker, Layout, Button, message, Table, Select } from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Sidebar from "./companydashboard/Dashboard";
import { useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const ManageInterview = () => {
  const { processId, id } = useParams();
  const [collapsed, setCollapsed] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [interviewAssignments, setInterviewAssignments] = useState({});
  const [unassignedCandidates, setUnassignedCandidates] = useState([]);
  const [assignedCandidates, setAssignedCandidates] = useState([]);

  const fetchCandidates = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(
        `http://localhost:8000/api/register/get/${processId}`
      );
      const candidatesData = response.data.candidates;
      const registrationsData = response.data.listRegistrations;

      const unassigned = candidatesData.filter((candidate) => {
        const registration = registrationsData.find(
          (reg) => reg.candidateId === candidate._id
        );
        if (registration) {
          return !registration.interviewSlots.some(
            (slot) => slot.interviewId.toString() === id
          );
        }
        return true;
      });

      const assigned = registrationsData
        .filter((reg) =>
          reg.interviewSlots.some((slot) => slot.interviewId.toString() === id)
        )
        .map((reg) => ({
          ...reg,
          candidate: candidatesData.find(
            (candidate) => candidate._id === reg.candidateId
          ),
        }));

      setUnassignedCandidates(unassigned);
      setAssignedCandidates(assigned);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
      message.error("Failed to fetch candidates");
    }
  };

  const fetchEmployees = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const companyId = jwtDecode(access_token).id;
      const response = await axios.get(
        `http://localhost:8000/api/companyemployee/getall/company/${companyId}`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      message.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchEmployees();
  }, [processId]);

  const handleDateChange = (candidateId, date) => {
    setInterviewAssignments((prev) => ({
      ...prev,
      [candidateId]: {
        ...prev[candidateId],
        date,
      },
    }));
  };

  const handleInterviewerChange = (candidateId, interviewerId) => {
    setInterviewAssignments((prev) => ({
      ...prev,
      [candidateId]: {
        ...prev[candidateId],
        interviewerId,
      },
    }));
  };

  const handleSaveAssignments = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      console.log(interviewAssignments);
      const promises = Object.keys(interviewAssignments).map(
        async (candidateId) => {
          const { interviewerId, date } = interviewAssignments[candidateId];
          await axios.put(
            `http://localhost:8000/api/register/addslot/${candidateId}/${processId}`,
            { interviewerId, date, interviewId: id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
            }
          );
        }
      );
      await Promise.all(promises);
      message.success("Interview assignments saved successfully!");
      fetchCandidates();
      employees.map(async (emp) => {
        const link = `http://${window.location.host}/interview/admin/${processId}/${id}`;
        await emailjs.send("service_kdjbg5o", "template_d0qkf0h", {
          subject: "Interview round created",
          header: "Check on the given link for interview round details",
          message: `this is the link ${link}`,
          info: "null",
          recipientEmail: "anshjain2255@gmail.com",
        });
      });
    } catch (error) {
      console.error("Failed to save interview assignments:", error);
      message.error("Failed to save interview assignments");
    }
  };

  useEffect(() => {
    emailjs.init("Oe0L9iQlLy0etAYWu");
  }, []);

  const unassignedColumns = [
    {
      title: "Candidate Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date",
      key: "date",
      render: (text, record) => (
        <DatePicker
          style={{ width: 200 }}
          onChange={(date) => handleDateChange(record._id, date)}
          placeholder="Select Date"
        />
      ),
    },
    {
      title: "Assign Interviewer",
      key: "interviewer",
      render: (text, record) => (
        <Select
          style={{ width: 200 }}
          onChange={(value) => handleInterviewerChange(record._id, value)}
          placeholder="Select Interviewer"
        >
          {employees.map((employee) => (
            <Option key={employee._id} value={employee._id}>
              {employee.name}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  const assignedColumns = [
    {
      title: "Candidate Name",
      dataIndex: ["candidate", "name"],
      key: "candidateName",
    },
    {
      title: "Email",
      dataIndex: ["candidate", "email"],
      key: "candidateEmail",
    },
    {
      title: "Date",
      key: "date",
      render: (text, record) => {
        const slot = record.interviewSlots.find(
          (slot) => slot.interviewId.toString() === id
        );
        return slot ? slot.date : "N/A";
      },
    },
    {
      title: "Assigned Interviewer",
      key: "interviewerName",
      render: (text, record) => {
        const slot = record.interviewSlots.find(
          (slot) => slot.interviewId.toString() === id
        );
        const interviewer = employees.find(
          (emp) => emp._id === slot?.interviewerId
        );
        return interviewer ? interviewer.name : "N/A";
      },
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
          <h2>Manage Interview</h2>
          <h3>Unassigned Candidates</h3>
          <Table
            dataSource={unassignedCandidates}
            columns={unassignedColumns}
            rowKey="_id"
          />
          <Button
            type="primary"
            onClick={handleSaveAssignments}
            style={{ marginTop: 16 }}
          >
            Save Assignments
          </Button>
          <h3>Assigned Candidates</h3>
          <Table
            dataSource={assignedCandidates}
            columns={assignedColumns}
            rowKey="_id"
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManageInterview;
