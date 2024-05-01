import { IProject } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchProjects = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_CANONICAL}/api/projects`
  );
  return response.data as IProject[];
};

export const fetchSingleProject = async (projectId: string) => {
  const response = await axios.get(
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
