import { IProject, IUser } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchProjects = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_CANONICAL}/api/projects`
  );
  return response.data as IProject[];
};
export const fetchUsers = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_CANONICAL}/api/users`
  );
  return response.data as IUser[];
};

export const fetchSingleProject = async (projectId: string) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_CANONICAL}/api/projects/${projectId}`
  );
  return response.data as IProject;
};
export const addProject = async (requestBody: IProject) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_CANONICAL}/api/projects`,
    requestBody
  );
  return response.data as IProject;
};
export const updateProject = async (projectId: string, project: IProject) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_CANONICAL}/api/projects/${projectId}`,
    project
  );
  return response.data as IProject;
};
export const deleteProject = async (projectId: string) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_CANONICAL}/api/projects/${projectId}`
  );
  return response.data as IProject;
};

export function useGetProjects() {
  return useQuery({
    queryFn: async () => fetchProjects(),
    queryKey: ["projects"],
  });
}

export function useGetUsers() {
  return useQuery({
    queryFn: async () => fetchUsers(),
    queryKey: ["users"],
  });
}
