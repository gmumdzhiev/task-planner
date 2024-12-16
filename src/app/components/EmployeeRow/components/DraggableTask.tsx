import React, { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextMenu } from "../../ContextMenu";
import {
  faClock,
  faMoneyBill,
  faCopy,
  faTrashAlt,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { Task, Employee } from "../../../types/schedule";

interface DraggableTaskProps {
  task: Task;
  employee: Employee;
  day: string | null;
  employeeIndex: number;
  openTaskId: string | null;
  onContextMenuOpen: (taskId: string) => void;
  onOpenModal: (
    task: Task | null,
    employee: Employee | null,
    day: string | null,
    formType: "shift" | "leave" | "edit"
  ) => void;
  onDeleteTask: (employeeIndex: number, taskId: string) => void;
}

const labelColorMap: { [key: string]: string } = {
  Opening: "bg-orange-600",
  Closing: "bg-rose-600",
  Cashier: "bg-lime-600",
  Stock: "bg-violet-900",
  Truck: "bg-blue-700",
};

export const DraggableTask = ({
  task,
  employee,
  day,
  employeeIndex,
  openTaskId,
  onContextMenuOpen,
  onOpenModal,
  onDeleteTask,
}: DraggableTaskProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${employeeIndex}-${task.id}`,
  });

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    onContextMenuOpen(`draggable-${employeeIndex}-${task.id}`);
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    if (openTaskId !== `draggable-${employeeIndex}-${task.id}`) {
      setContextMenu(null);
    }
  }, [openTaskId, employeeIndex, task.id]);

  const closeContextMenu = () => setContextMenu(null);

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: 10,
  };

  const isHoliday = task.label === "Holiday";
  const isRecuperation = task.label === "Recuperation";

  const menuOptions = [
    {
      label: "Copy",
      action: () => console.log("Copied"),
      icon: faCopy,
      color: "base",
    },
    {
      label: "Edit",
      action: (event: React.MouseEvent) => {
        event.stopPropagation();
        onOpenModal(task, employee, day, "edit");
      },
      icon: faPencil,
      color: "base",
    },
    {
      label: "Delete",
      action: (event: React.MouseEvent) => {
        event.stopPropagation();
        onDeleteTask(employeeIndex, task.id);
      },
      icon: faTrashAlt,
      color: "danger",
    },
  ];

  const getLabelDisplay = () => {
    if (isHoliday) return { bigLetter: "H", labelText: "Holiday" };
    if (isRecuperation) return { bigLetter: "R", labelText: "Récupération" };
    return null;
  };

  const labelDisplay = getLabelDisplay();

  const labelColorClass = labelColorMap[task.label] || "bg-lime-600";

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        onContextMenu={handleContextMenu}
        onClick={(event) => event.stopPropagation()}
        className={`my-2 relative z-10 flex flex-col items-start w-full p-2 rounded-md shadow 
          ${
            labelDisplay
              ? "bg-gray-100 text-gray-700 bg-[repeating-linear-gradient(-45deg,_#f7fafc,_#f7fafc_10px,_#e2e8f0_10px,_#e2e8f0_20px)]"
              : "bg-lime-200 text-green-600"
          }`}
      >
        {!labelDisplay && (
          <span className="py-1 text-base font-semibold text-gray-700">
            {task.startTime}-{task.endTime}
          </span>
        )}

        <div className="py-1 flex items-center gap-2">
          {labelDisplay && (
            <span className="block text-2xl font-bold text-gray-800">
              {labelDisplay.bigLetter}
            </span>
          )}

          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faClock}
              className="text-gray-500 icon-size"
            />
            <span className="text-gray-500 text-xs font-medium">
              {task.totalHours}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faMoneyBill}
              className="text-gray-500 icon-size"
            />
            <span className="text-gray-500 text-xs font-medium">
              {task.cost} €
            </span>
          </div>
        </div>
        {labelDisplay && (
          <span className="py-1 block text-gray-500 text-xs font-medium">
            {labelDisplay.labelText}
          </span>
        )}
        {labelDisplay && (
          <span className="py-1 block text-gray-500 text-xs font-medium">
            {task.startTime}-{task.endTime}
          </span>
        )}
        {!labelDisplay && (
          <span
            className={`py-1 w-full text-xs font-semibold rounded-md shadow ${labelColorClass} text-gray-100 px-2 my-1`}
          >
            {task.label}
          </span>
        )}
      </div>

      {contextMenu && (
        <ContextMenu
          options={menuOptions}
          position={contextMenu}
          onClose={closeContextMenu}
        />
      )}
    </>
  );
};
