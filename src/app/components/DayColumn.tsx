import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";

type DayColumnProps = {
  day: string;
  tasks: { id: string; title: string }[];
};

export const DayColumn = ({ day, tasks }: DayColumnProps) => {
  const { setNodeRef } = useDroppable({ id: day });

  return (
    <div ref={setNodeRef} className="bg-gray-100 p-4 rounded shadow w-1/3">
      <h2 className="font-bold text-lg">{day}</h2>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} id={task.id} title={task.title} />
        ))}
      </div>
    </div>
  );
};
