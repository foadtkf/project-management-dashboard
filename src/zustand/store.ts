import {
  addProject,
  deleteProject,
  updateProject,
  useGetProjects,
} from "@/actions/actions";
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
  addProject: (project: IProject) => void;
  updateProject: (project: IProject, projectID: string) => void;
  deleteProject: (projectId: string) => void;
}
export const useProjectsStore = create<IState & IActions>()(
  persist(
    (set) => ({
      projects: [] as IProject[],
      draggedTask: null,
      dragTask: (id: string | null) => set({ draggedTask: id }),
      updateProject: (project: IProject, projectID: string) =>
        set((state) => {
          const projectIndex = state.projects.findIndex(
            (p) => p._id === projectID
          );
          state.projects[projectIndex] = project;
          updateProject(projectID, project);
          return { projects: state.projects };
        }),
      updateTask: async (
        draggedTask: string,
        status: IStatus,
        projectId: string
      ) =>
        set((state) => {
          const projectIndex = state.projects.findIndex(
            (project) => project._id === projectId
          );
          const taskIndex = state.projects[projectIndex].tasks.findIndex(
            (t) => t.title === draggedTask
          );
          state.projects[projectIndex].tasks[taskIndex].status = status;
          updateProject(projectId, state.projects[projectIndex]);
          return { projects: state.projects };
        }),
      addProject: async (project: IProject) =>
        set((state) => {
          state.projects.push(project);
          addProject(project);
          return { projects: state.projects };
        }),
      deleteProject: async (projectId: string) =>
        set((state) => {
          const projectIndex = state.projects.findIndex(
            (p) => p._id === projectId
          );
          state.projects.splice(projectIndex, 1);
          deleteProject(projectId);
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
