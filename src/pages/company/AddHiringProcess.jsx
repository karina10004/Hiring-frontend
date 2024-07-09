import React, { useState } from "react";
import { Form, Input, DatePicker, Select, Space } from "antd";
import "./AddHiringProcess.css";
const HiringProcessForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <Form
        form={form}
        layout="vertical"
        name="hiringProcessForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ maxWidth: 600, margin: "0 auto" }}
      >
        <Form.Item
          label="Job Title"
          name="title"
          rules={[{ required: true, message: "Please enter the job title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="desc"
          rules={[
            { required: true, message: "Please enter a job description" },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Number of Rounds"
          name="numRounds"
          rules={[
            { required: true, message: "Please enter the number of rounds" },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[{ required: true, message: "Please select a start date" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[{ required: true, message: "Please select an end date" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Company"
          name="companyId"
          rules={[{ required: true, message: "Please select a company" }]}
        >
          <Select placeholder="Select Company">
            <Select.Option value="company1">Company 1</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <button type="primary" htmlType="submit">
            Create Hiring Process
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default HiringProcessForm;
