import Contents from "@/components/ui/Contents";
import Sidebar from "@/components/ui/Sidebar";
import { Layout } from "antd";
import React from "react";

const Dahsboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Sidebar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default Dahsboard;
