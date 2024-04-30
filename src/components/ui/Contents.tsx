"use client";
import { Layout } from "antd";
import React from "react";

const Contents = ({ children }: { children: React.ReactNode }) => {
  const { Content } = Layout;
  return <Content style={{ minHeight: "100vh" }}>{children}</Content>;
};

export default Contents;
