import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { DraggableTask } from "../DraggableTask/DraggableTask";
import { Task } from "../../../../types/schedule";
import { PasteContextMenu } from "../../../PasteContextMenu/PasteContextMenu";
import { IProps } from "./IProps";

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
}: IProps) => {
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

  const isWeekend = day === "Sat" || day === "Sun";

  return (
    <div
      ref={setNodeRef}
      className={`relative p-2 border border-gray-200 group hover:bg-gray-100 ${
        isWeekend ? "bg-yellow-100" : ""
      }`}
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
