import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { DraggableTask } from "../components/DraggableTask";
import { Task, Employee } from "../../../types/schedule";
import { PasteContextMenu } from "../../PasteContextMenu";

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
  onCopyTask: (task: Task) => void;
  onPasteTask: (task: Task, day: string, employeeIndex: number) => void;
  copiedTask: Task | null;
  onDeleteTask: (employeeIndex: number, taskId: string) => void;
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
  onDeleteTask,
  onCopyTask,
  onPasteTask,
  copiedTask,
}: DroppableAreaProps) => {
  const { setNodeRef } = useDroppable({
    id: `droppable-${employeeIndex}-${dayIndex}`,
  });

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleOpenModal = (
    event: React.MouseEvent,
    formType: "shift" | "leave" | "edit"
  ) => {
    event.stopPropagation();
    onOpenModal(null, employee, day, formType);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    if (tasks.length === 0 && copiedTask) {
      setContextMenu({ x: event.clientX, y: event.clientY });
    }
  };

  const closeContextMenu = () => setContextMenu(null);

  const handlePaste = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (copiedTask) {
      onPasteTask(copiedTask, day, employeeIndex);
      closeContextMenu();
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="relative p-2 border border-gray-200 group hover:bg-gray-100"
      onClick={(event) => handleOpenModal(event, "shift")}
      onContextMenu={handleContextMenu}
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
          onCopyTask={onCopyTask}
          onPasteTask={onPasteTask}
          copiedTask={copiedTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
      {contextMenu && copiedTask && (
        <PasteContextMenu
          position={contextMenu}
          onPaste={handlePaste}
          onClose={closeContextMenu}
        />
      )}
    </div>
  );
};
