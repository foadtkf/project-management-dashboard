import React from "react";
import { Col, Row } from "antd";
import Image from "next/image";
import authimg from "@/Assets/login.svg";
const Authentication = ({ children }: { children: React.ReactNode }) => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col sm={12} md={16} lg={10}>
        <Image src={authimg} width={500} alt="User Login img" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        {children}
      </Col>
    </Row>
  );
};

export default Authentication;
