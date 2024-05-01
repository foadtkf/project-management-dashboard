"use client";
import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
const Sidebar = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      <Link href={`/projects`}>Projects</Link>,
      "1",
      <PieChartOutlined />
    ),
    getItem(
      <Link href={`/add-project`}>Add Projects</Link>,
      "2",
      <DesktopOutlined />
    ),
    getItem(
      <Button
        block
        danger
        onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
      >
        Logout
      </Button>,
      "3"
    ),
  ];
  const pathName = usePathname();
  const urlAry = [
    { key: "1", url: "/projects" },
    { key: "2", url: "/add-project" },
  ];
  const defaultKey = urlAry.map((item) => item.url).includes(pathName)
    ? urlAry.find((item) => item.url === pathName)?.key
    : "1";

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={[defaultKey || "1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
