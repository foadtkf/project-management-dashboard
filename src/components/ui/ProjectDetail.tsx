"use client";

import { ITask } from "@/types/types";
import { useProjects, useProjectsStore } from "@/zustand/store";
import { Col, Row, Skeleton, Timeline } from "antd";
import Task from "./Task";
import TaskColumns from "./Columns";

const ProjectDetail = ({ projectID }: { projectID: string }) => { 

  const { projects, isLoading, isError } = useProjects();
  const projectData = projects.find((p) => p._id === projectID);
  return (
    <div>
      {projectData ? (
        <>
          {" "}
          <h1 className="text_24px">{projectData.name}</h1>
          <p className="text_15px"> {projectData.description}</p>
          <p className="text_20px pt-[10px]">Team Members:</p>
          <ol>
            {projectData.teamMembers.map((member) => (
              <li className="text_15px" key={Math.random()}>
                {member.email}
              </li>
            ))}
          </ol>
          {projectData.recentActivities && (
            <>
              <p className="text_20px pt-[10px]">Recent Activities:</p>
              <ol>
                {projectData.recentActivities.map((ra) => (
                  <li className="text_15px" key={Math.random()}>
                    {ra}
                  </li>
                ))}
              </ol>
            </>
          )}
          <br />
          <TaskColumns projectID={projectID} />
        </>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default ProjectDetail;
