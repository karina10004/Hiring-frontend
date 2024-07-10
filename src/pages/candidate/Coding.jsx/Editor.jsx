import React, { useState } from "react";
import {
  Layout,
  Menu,
  Breadcrumb,
  Card,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Select,
  Switch,
} from "antd";
import "./Editor.css";

const { Header, Content, Footer, Sider } = Layout;
const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const dummyQuestion = {
  title: "Example Question",
  description: "Write a function that returns the sum of two numbers.",
};

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [darkTheme, setDarkTheme] = useState(false);

  const handleRunCode = () => {
    try {
      // For demo purposes, we're only evaluating JavaScript code
      if (language === "javascript") {
        const result = eval(code);
        setOutput(result.toString());
      } else {
        setOutput("Language execution not implemented.");
      }
    } catch (error) {
      setOutput(error.toString());
    }
  };

  const handleClearEditor = () => {
    setCode("");
    setOutput("");
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  const handleThemeChange = (checked) => {
    setDarkTheme(checked);
  };

  return (
    <Layout className={`layout ${darkTheme ? "dark-theme" : "light-theme"}`}>
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
            <Title level={4}>{dummyQuestion.title}</Title>
            <p>{dummyQuestion.description}</p>
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
                  <Select
                    defaultValue="javascript"
                    style={{ width: 120, marginRight: 10 }}
                    onChange={handleLanguageChange}
                  >
                    <Option value="javascript">JavaScript</Option>
                    <Option value="python">Python</Option>
                    <Option value="java">Java</Option>
                  </Select>
                  <Switch
                    checked={darkTheme}
                    onChange={handleThemeChange}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                    style={{ marginBottom: 20 }}
                  />
                </Col>
                <Col span={24}>
                  <TextArea
                    rows={10}
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Write your code here..."
                  />
                </Col>
                <Col span={24}>
                  <Button
                    type="primary"
                    onClick={handleRunCode}
                    style={{ marginRight: "10px" }}
                  >
                    Run Code
                  </Button>
                  <Button onClick={handleClearEditor}>Clear Editor</Button>
                </Col>
                <Col span={24}>
                  <Title level={4}>Output</Title>
                  <Card>
                    <pre>{output}</pre>
                  </Card>
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
