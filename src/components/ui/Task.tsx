import { ITask } from "@/types/types";
import { useProjectsStore } from "@/zustand/store";

export default function Task({
  task,
  projectID,
}: {
  task: ITask;
  projectID: string;
}) {
  const { assignedTo, deadline, status, title, description } = task;

  const dragTask = useProjectsStore((state) => state.dragTask);
  return (
    <div
      className={`flex cursor-move items-start justify-between rounded-lg bg-white px-3 py-2   `}
      onDragStart={() => dragTask(task.title)}
      draggable
    >
      <div>
        <h3 className="font-medium text-gray-700">{title}</h3>
        <p className="text-sm font-light text-gray-500">{description}</p>
        <p className="text-sm font-light text-gray-500">
          Member: {assignedTo.email}
        </p>
      </div>
    </div>
  );
}
