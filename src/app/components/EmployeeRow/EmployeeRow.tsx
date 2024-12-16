import React from "react";
import { Employee, Task } from "../../types/schedule";
import { DroppableArea } from "./components/DroppableArea";

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
      <div className="flex flex-col items-start justify-center p-4 bg-gray-100">
        <span className="text-sm font-medium font-semibold text-gray-700">
          {employee.name}
        </span>
        <span className="text-xs text-gray-500">{employee.role}</span>
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
