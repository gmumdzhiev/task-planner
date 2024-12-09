import React from "react";
import { Employee, Task } from "../types/schedule";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPause,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

interface EmployeeRowProps {
  employee: Employee;
  employeeIndex: number;
  week: string[];
}

export const EmployeeRow = ({
  employee,
  employeeIndex,
  week,
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
        />
      ))}
    </div>
  );
};

const DraggableTask = ({
  task,
  employeeIndex,
}: {
  task: Task;
  employeeIndex: number;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${employeeIndex}-${task.id}`,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div
        key={task.id}
        className={`flex flex-col items-start w-full p-2 rounded-md shadow ${
          task.type === "break"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-lime-200 text-green-600"
        }`}
      >
        <span className="py-1 text-base font-semibold text-gray-700">
          {task.time}
        </span>
        <div className="py-1 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faClock}
              className="text-gray-500 icon-size"
            />
            <span className="text-gray-500 text-xs font-medium">
              {task.hours}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={faPause}
              className="text-gray-500 icon-size"
            />
            <span className="text-gray-500 text-xs font-medium">
              {task.break}
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
        <span className="py-1 w-full text-xs font-semibold rounded-md shadow bg-lime-600 text-gray-700 px-2">
          {task.label}
        </span>
      </div>
    </div>
  );
};

const DroppableArea = ({
  employeeIndex,
  dayIndex,
  tasks,
}: {
  employeeIndex: number;
  dayIndex: number;
  tasks: Task[];
}) => {
  const { setNodeRef } = useDroppable({
    id: `${employeeIndex}-${dayIndex}`,
  });

  return (
    <div ref={setNodeRef} className="p-2 border border-gray-200">
      {tasks.map((task) => (
        <DraggableTask
          key={task.id}
          task={task}
          employeeIndex={employeeIndex}
        />
      ))}
    </div>
  );
};
