"use client";
import React, { useState, useEffect } from "react";
import { Employee, Task } from "../types/schedule";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextMenu } from "./ContextMenu";
import {
  faClock,
  faPause,
  faMoneyBill,
  faCopy,
  faTrashAlt,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

interface EmployeeRowProps {
  employee: Employee;
  employeeIndex: number;
  week: string[];
  onOpenModal: (
    task: Task | null,
    employee: Employee | null,
    day: string | null
  ) => void;
  openTaskId: string | null;
  onContextMenuOpen: (taskId: string) => void;
}

interface DroppableAreaProps {
  employeeIndex: number;
  dayIndex: number;
  tasks: Task[];
  openTaskId: string | null;
  onContextMenuOpen: (taskId: string) => void;
  onOpenModal: (
    task: Task | null,
    employee: Employee | null,
    day: string | null
  ) => void;
  employee: Employee;
  day: string;
}

interface DraggableTaskProps {
  task: Task;
  employeeIndex: number;
  openTaskId: string | null;
  onContextMenuOpen: (taskId: string) => void;
  onOpenModal: (
    task: Task | null,
    employee: Employee | null,
    day: string | null
  ) => void;
}

export const EmployeeRow = ({
  employee,
  employeeIndex,
  week,
  onOpenModal,
  openTaskId,
  onContextMenuOpen,
}: EmployeeRowProps) => {
  return (
    <div className="grid grid-cols-8 border-b last:border-b-0 border-gray-200">
      {" "}
      <div className="flex flex-col items-start justify-center p-4 bg-gray-100">
        {" "}
        <span className="text-sm font-medium font-semibold text-gray-700">
          {" "}
          {employee.name}{" "}
        </span>{" "}
        <span className="text-xs text-gray-500">{employee.role}</span>{" "}
      </div>{" "}
      {week.map((day, dayIndex) => (
        <DroppableArea
          key={`${employeeIndex}-${dayIndex}`}
          employeeIndex={employeeIndex}
          dayIndex={dayIndex}
          tasks={employee.tasks.filter((task) => task.day === day)}
          openTaskId={openTaskId}
          onContextMenuOpen={onContextMenuOpen}
          onOpenModal={onOpenModal}
          employee={employee}
          day={day}
        />
      ))}{" "}
    </div>
  );
};

export const DraggableTask = ({
  task,
  employeeIndex,
  openTaskId,
  onContextMenuOpen,
  onOpenModal,
}: DraggableTaskProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${employeeIndex}-${task.id}`,
  });
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    onContextMenuOpen(`${employeeIndex}-${task.id}`);
    setContextMenu({ x: event.clientX, y: event.clientY });
  };
  useEffect(() => {
    if (openTaskId !== `${employeeIndex}-${task.id}`) {
      setContextMenu(null);
    }
  }, [openTaskId, employeeIndex, task.id]);
  const closeContextMenu = () => {
    setContextMenu(null);
  };
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };
  const menuOptions = [
    {
      label: "Copy",
      action: () => console.log("Copied"),
      icon: faCopy,
      color: "base",
    },
    {
      label: "Edit",
      action: () => onOpenModal(task, null, null),
      icon: faPencil,
      color: "base",
    },
    {
      label: "Delete",
      action: () => console.log("Deleted"),
      icon: faTrashAlt,
      color: "danger",
    },
  ];
  return (
    <>
      {" "}
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        onContextMenu={handleContextMenu}
        onClick={(event) => event.stopPropagation()}
        className={`flex flex-col items-start w-full p-2 rounded-md shadow ${
          task.type === "break"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-lime-200 text-green-600"
        }`}
      >
        {" "}
        <span className="py-1 text-base font-semibold text-gray-700">
          {" "}
          {task.startTime}-{task.endTime}{" "}
        </span>{" "}
        <div className="py-1 flex items-center gap-2">
          {" "}
          <div className="flex items-center gap-1">
            {" "}
            <FontAwesomeIcon
              icon={faClock}
              className="text-gray-500 icon-size"
            />{" "}
            <span className="text-gray-500 text-xs font-medium">
              {" "}
              {task.totalHours}{" "}
            </span>{" "}
          </div>{" "}
          <div className="flex items-center gap-1">
            {" "}
            <FontAwesomeIcon
              icon={faPause}
              className="text-gray-500 icon-size"
            />{" "}
            <span className="text-gray-500 text-xs font-medium">
              {" "}
              {task.break}{" "}
            </span>{" "}
          </div>{" "}
          <div className="flex items-center gap-1">
            {" "}
            <FontAwesomeIcon
              icon={faMoneyBill}
              className="text-gray-500 icon-size"
            />{" "}
            <span className="text-gray-500 text-xs font-medium">
              {" "}
              {task.cost} €{" "}
            </span>{" "}
          </div>{" "}
        </div>{" "}
        <span className="py-1 w-full text-xs font-semibold rounded-md shadow bg-lime-600 text-gray-700 px-2">
          {" "}
          {task.label}{" "}
        </span>{" "}
      </div>{" "}
      {contextMenu && (
        <ContextMenu
          options={menuOptions}
          position={contextMenu}
          onClose={closeContextMenu}
        />
      )}{" "}
    </>
  );
};

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
  const { setNodeRef } = useDroppable({ id: `${employeeIndex}-${dayIndex}` });
  const handleOpenModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    onOpenModal(null, employee, day);
  };
  return (
    <div
      ref={setNodeRef}
      className="p-2 border border-gray-200 relative group hover:bg-gray-100"
      onClick={handleOpenModal}
    >
      {" "}
      {tasks.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          {" "}
          <button className="text-gray-500 text-2xl">+</button>{" "}
        </div>
      )}{" "}
      {tasks.map((task) => (
        <DraggableTask
          key={task.id}
          task={task}
          employeeIndex={employeeIndex}
          openTaskId={openTaskId}
          onContextMenuOpen={onContextMenuOpen}
          onOpenModal={onOpenModal}
        />
      ))}{" "}
    </div>
  );
};
