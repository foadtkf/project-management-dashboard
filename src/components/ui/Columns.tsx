"use client";

import { ITask } from "@/types/types";
import { useProjectById, useProjectsStore } from "@/zustand/store";
import { Col, Row, Timeline } from "antd";
import Task from "./Task";
import Column from "./Column";

const TaskColumns = ({ projectID }: { projectID: string }) => {
  const projectData = useProjectById(projectID);
  return (
    <div>
      {projectData && (
        <div className="lg:grid lg:grid-cols-3 gap-4">
          <Column status="To Do" title="To Do" projectID={projectID} />
          <Column
            status="In Progress"
            title="In Progress"
            projectID={projectID}
          />
          <Column status="Done" title="Done" projectID={projectID} />
        </div>
      )}
    </div>
  );
};

export default TaskColumns;
