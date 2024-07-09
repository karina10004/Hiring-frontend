import React from "react";
import { Card, Flex, Typography, Form, Input } from "antd";
import { Button } from "antd/es/radio";
import "./AddEmployee.css";
const AddEmployee = () => {
  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Add Employee
          </Typography.Title>
          <Form layout="vertical">
            <Form.Item
              label="Employee Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "please input the name of Employee",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Position"
              name="position"
              rules={[
                {
                  required: true,
                  message: "please input position",
                },
              ]}
            >
              <Input size="large" placeholder="Enter position of employee" />
            </Form.Item>
            <Form.Item
              label="CandidateId"
              name="CandidateId"
              rules={[
                {
                  required: true,
                  message: "please input position",
                },
              ]}
            >
              <Input size="large" placeholder="Please Enter the CandidateId" />
            </Form.Item>
            <Form.Item
              label="email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "please enter email",
                },
              ]}
            >
              <Input size="large" placeholder="Enter email address" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="btn"
              >
                Add Employee
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  );
};

export default AddEmployee;
