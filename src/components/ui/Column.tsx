"use client";

import { IStatus, ITask } from "@/types/types";
import { useProjects, useProjectsStore } from "@/zustand/store";
import { useEffect, useMemo } from "react";
import Task from "./Task";

export default function Column({
  title,
  status,
  projectID,
}: {
  title: string;
  status: IStatus;
  projectID: string;
}) {
  const { projects, isLoading, isError } = useProjects();
  const CurProject = projects.find((p) => p._id === projectID);
  const tasks = CurProject?.tasks || [];
  const draggedTask = useProjectsStore((state) => state.draggedTask);
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.status === status),
    [tasks, status, draggedTask]
  );

  const updateTask = useProjectsStore((state) => state.updateTask);
  const dragTask = useProjectsStore((state) => state.dragTask);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return;
    updateTask(draggedTask, status, projectID);
    dragTask(null);
  };

  useEffect(() => {
    useProjectsStore.persist.rehydrate();
  }, []);

  return (
    <section className="h-[300px] flex-1">
      <h2 className="text_20px">{title}</h2>

      <div
        className="mt-3.5 h-full w-full rounded-xl bg-[#001529] p-4"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-4">
          {filteredTasks.map((task) => (
            <Task key={task.title} task={task} projectID={projectID} />
          ))}
        </div>
      </div>
    </section>
  );
}
