import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { DraggableTask } from "../components/DraggableTask";
import { Task, Employee } from "../../../types/schedule";

interface DroppableAreaProps {
  employeeIndex: number;
  dayIndex: number;
  tasks: Task[];
  openTaskId: string | null;
  onContextMenuOpen: (taskId: string) => void;
  onOpenModal: (
    task: Task | null,
    employee: Employee | null,
    day: string | null,
    formType: "shift" | "leave" | "edit"
  ) => void;
  employee: Employee;
  day: string;
}

export const DroppableArea = ({
  employeeIndex,
  dayIndex,
  tasks,
  openTaskId,
  onContextMenuOpen,
  onOpenModal,
  employee,
  day,
}: DroppableAreaProps) => {
  const { setNodeRef } = useDroppable({
    id: `droppable-${employeeIndex}-${dayIndex}`,
  });

  const handleOpenModal = (
    event: React.MouseEvent,
    formType: "shift" | "leave" | "edit"
  ) => {
    event.stopPropagation();
    onOpenModal(null, employee, day, formType);
  };

  return (
    <div
      ref={setNodeRef}
      className="relative p-2 border border-gray-200 group hover:bg-gray-100"
      onClick={(event) => handleOpenModal(event, "shift")}
    >
      {tasks.length === 0 && (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button className="text-gray-500 text-2xl">+</button>
        </div>
      )}
      {tasks.map((task: Task) => (
        <DraggableTask
          key={task.id}
          task={task}
          employee={employee}
          day={day}
          employeeIndex={employeeIndex}
          openTaskId={openTaskId}
          onContextMenuOpen={onContextMenuOpen}
          onOpenModal={onOpenModal}
        />
      ))}
    </div>
  );
};
