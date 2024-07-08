import React from "react";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from "antd";
import "./AddHiringProcess.css";

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};

const AddHiringProcess = () => {
  const handleSubmit = () => {
    console.log();
  };

  return (
    <div className="hiringprocess">
      <Form {...formItemLayout} variant="filled">
        <Form.Item
          className="custom-form-item"
          label="Title"
          name="Title"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input className="custom-input" />
        </Form.Item>

        <Form.Item
          className="custom-form-item"
          label="Description"
          name="Description"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input.TextArea className="custom-textarea" />
        </Form.Item>

        <Form.Item
          className="custom-form-item"
          label="Number of Rounds"
          name="Number of Rounds"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <InputNumber className="custom-input-number" />
        </Form.Item>

        <Form.Item
          className="custom-form-item"
          label="Schedule"
          name="schedule"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <RangePicker className="custom-picker" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="custom-button-primary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
