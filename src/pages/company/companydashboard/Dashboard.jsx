import React, { useState } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };
  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={handleMenuClick}
    >
      <Menu.Item key="1" icon={<HomeOutlined />}>
        Home
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        User
      </Menu.Item>
      <Menu.Item key="3" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="4" icon={<UserAddOutlined />}>
        <Link to={`/employee`}>Add Employee</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<UserAddOutlined />}>
        <Link to={`/hiring`}>Add Hiring Process</Link>
      </Menu.Item>
    </Menu>
  );
};
export default Sidebar;
