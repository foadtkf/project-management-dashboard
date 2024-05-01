"use client";
import { IProject } from "@/types/types";
import { useProjects } from "@/zustand/store";
import { List } from "antd";
import React from "react";
import { ProjectItem } from "./ProjectItem";

const ProjectList = () => {
  const { projects, isLoading, isError } = useProjects();
  return (
    <List
      locale={{
        emptyText: "There's no projects :(",
      }}
      dataSource={projects as IProject[]}
      renderItem={(project) => <ProjectItem project={project} />}
      pagination={{
        position: "bottom",
        pageSize: 5,
      }}
    />
  );
};

export default ProjectList;
