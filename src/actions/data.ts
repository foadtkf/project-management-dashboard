import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "./actions";

export function useGetProjects() {
  return useQuery({
    queryFn: async () => fetchProjects(),
    queryKey: ["projects"],
  });
}
