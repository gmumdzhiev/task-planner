import React from "react";
import Image from "next/image";
import { Employee, Task } from "../../types/schedule";
import { DroppableArea } from "./components/DroppableArea";

// Avatar file paths
const avatars = [
  "/assets/avatar1.jpg",
  "/assets/avatar2.jpg",
  "/assets/avatar3.jpg",
  "/assets/avatar4.jpg",
  "/assets/avatar5.jpg",
];

interface EmployeeRowProps {
  employee: Employee;
  employeeIndex: number;
  week: string[];
  onOpenModal: (
    task: Task | null,
    employee: Employee | null,
    day: string | null,
    formType: "shift" | "leave" | "edit"
  ) => void;
  openTaskId: string | null;
  onContextMenuOpen: (taskId: string) => void;
  onCopyTask: (task: Task) => void;
  onPasteTask: (task: Task, day: string, employeeIndex: number) => void;
  copiedTask: Task | null;
  onDeleteTask: (employeeIndex: number, taskId: string) => void;
}

export const EmployeeRow = ({
  employee,
  employeeIndex,
  week,
  onOpenModal,
  openTaskId,
  onContextMenuOpen,
  onDeleteTask,
  onCopyTask,
  onPasteTask,
  copiedTask,
}: EmployeeRowProps) => {
  return (
    <div className="grid grid-cols-8 border-b last:border-b-0 border-gray-200">
      <div className="flex items-center p-4 bg-gray-100">
        <div className="w-8 h-8 relative mr-3">
          <Image
            src={avatars[employeeIndex % avatars.length]}
            alt={`${employee.name}'s avatar`}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium font-semibold text-gray-700">
            {employee.name}
          </span>
          <span className="text-xs text-gray-500">{employee.role}</span>
        </div>
      </div>
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
          onCopyTask={onCopyTask}
          onPasteTask={onPasteTask}
          copiedTask={copiedTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};
