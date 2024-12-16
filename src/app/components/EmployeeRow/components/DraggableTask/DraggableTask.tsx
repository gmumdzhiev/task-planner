import React, { useState, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextMenu } from "../../../ContextMenu/ContextMenu";
import {
  faClock,
  faMoneyBill,
  faCopy,
  faTrashAlt,
  faPencil,
  faPaste,
} from "@fortawesome/free-solid-svg-icons";
import { IProps } from "./IProps";
import { labelColorMap } from "@/utils/colors";

export const DraggableTask = ({
  task,
  employee,
  day,
  employeeIndex,
  openTaskId,
  onContextMenuOpen,
  onOpenModal,
  onDeleteTask,
  onCopyTask,
  copiedTask,
}: IProps) => {
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
      action: (event: React.MouseEvent) => {
        event.stopPropagation();
        onCopyTask(task);
      },
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

  if (copiedTask) {
    menuOptions.push({
      label: "Paste",
      action: (event: React.MouseEvent) => {
        event.stopPropagation();
      },
      icon: faPaste,
      color: "base",
    });
  }

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
          <div className="py-1 flex flex-col lg:flex-row">
            <span className=" text-xs md:text-sm lg:text-base font-semibold text-gray-700">
              {task.startTime}
            </span>
            -
            <span className=" text-xs md:text-sm lg:text-base font-semibold text-gray-700">
              {task.endTime}
            </span>
          </div>
        )}

        <div className="py-1 flex flex-col lg:flex-row items-start lg:items-center gap-2">
          {labelDisplay && (
            <span className="block text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
              {labelDisplay.bigLetter}
            </span>
          )}

          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faClock}
              className="text-gray-500 icon-size"
            />
            <span className="text-xs md:text-sm lg:text-base text-gray-500 font-medium">
              {task.totalHours}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faMoneyBill}
              className="text-gray-500 icon-size"
            />
            <span className="text-xs md:text-sm lg:text-base text-gray-500 font-medium">
              {task.cost} €
            </span>
          </div>
        </div>
        {labelDisplay && (
          <span className="py-1 block text-xs md:text-sm lg:text-base text-gray-500 font-medium">
            {labelDisplay.labelText}
          </span>
        )}
        {labelDisplay && (
          <span className="py-1 block text-xs md:text-sm lg:text-base text-gray-500 font-medium">
            {task.startTime}-{task.endTime}
          </span>
        )}
        {!labelDisplay && (
          <span
            className={`py-1 w-full text-xs md:text-sm lg:text-base font-semibold rounded-md shadow ${labelColorClass} text-gray-100 px-2 my-1`}
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
