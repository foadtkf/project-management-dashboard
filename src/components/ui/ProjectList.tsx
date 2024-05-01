"use client";
import { IProject, ITask } from "@/types/types";
import { useProjects } from "@/zustand/store";
import { Input, List, Radio } from "antd";
import React, { useState } from "react";
import { ProjectItem } from "./ProjectItem";

const ProjectList = () => {
  const { projects } = useProjects();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter projects based on search text
  const filteredProjects = projects.filter((project: IProject) => {
    const filteredTasks = project.tasks.filter((task: ITask) => {
      if (statusFilter && task.status !== statusFilter) {
        return false;
      }
      return task.title.toLowerCase().includes(searchText.toLowerCase());
    });
    return filteredTasks.length > 0;
  });
  return (
    <div>
      <Input.Search
        placeholder="Search projects"
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      <Radio.Group
        onChange={(e) => setStatusFilter(e.target.value)}
        value={statusFilter}
        style={{ marginBottom: 16 }}
      >
        <Radio.Button value="To Do">To Do</Radio.Button>
        <Radio.Button value="Done">Done</Radio.Button>
        <Radio.Button value="In Progress">In Progress</Radio.Button>
        <Radio.Button value={null}>All</Radio.Button>
      </Radio.Group>
      <List
        locale={{
          emptyText: "There's no projects :(",
        }}
        dataSource={filteredProjects as IProject[]}
        renderItem={(project) => <ProjectItem project={project} />}
        pagination={{
          position: "bottom",
          pageSize: 5,
        }}
      />
    </div>
  );
};

export default ProjectList;
