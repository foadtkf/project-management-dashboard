import { useGetProjects } from "@/actions/actions";
import { IProject, IStatus, ITask } from "@/types/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IState {
  projects: IProject[];
  draggedTask: string | null;
}
export interface IActions {
  updateTask: (draggedTask: string, status: IStatus, projectId: string) => void;
  dragTask: (id: string | null) => void;
}
export const useProjectsStore = create<IState & IActions>()(
  persist(
    (set) => ({
      projects: [] as IProject[],
      draggedTask: null,
      dragTask: (id: string | null) => set({ draggedTask: id }),
      updateTask: (draggedTask: string, status: IStatus, projectId: string) =>
        set((state) => {
          const projectIndex = state.projects.findIndex(
            (project) => project._id === projectId
          );
          const taskIndex = state.projects[projectIndex].tasks.findIndex(
            (t) => t.title === draggedTask
          );
          state.projects[projectIndex].tasks[taskIndex].status = status;
          return { projects: state.projects };
        }),
    }),
    {
      name: "projects",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useProjects = () => {
  const { data, isLoading, isError } = useGetProjects();

  if (isLoading || isError) {
    return { projects: [], isLoading, isError };
  }
  useProjectsStore.setState({ projects: data as IProject[] });

  return { projects: data as IProject[], isLoading, isError };
};
 
