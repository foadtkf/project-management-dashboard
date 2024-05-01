"use client";
import { IProject } from "@/types/types";
import { useProjectsStore } from "@/zustand/store";
import { Button, List, Popconfirm } from "antd";
import { useRouter } from "next/navigation";

export const ProjectItem = ({ project }: { project: IProject }) => {
  const routeTo = useRouter();
  const deleteProject = useProjectsStore((state) => state.deleteProject);
  return (
    <List.Item
      key={project._id}
      actions={[
        <Button
          key={Math.random()}
          onClick={() => routeTo.push(`/projects/${project._id}`)}
          className="view-todo-button"
          type="primary"
        >
          View
        </Button>,
        <Button
          key={Math.random()}
          onClick={() => routeTo.push(`/projects/${project._id}/edit`)}
          className="edit-todo-button"
          type="primary"
        >
          Edit
        </Button>,
        <Popconfirm
          key={Math.random()}
          title="Are you sure you want to delete?"
          onConfirm={() => deleteProject(project._id)}
        >
          <Button className="remove-todo-button" type="primary" danger>
            Delete
          </Button>
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta
        title={<a href={`/projects/${project._id}`}>{project.name}</a>}
        description={project.description}
      />
    </List.Item>
  );
};
