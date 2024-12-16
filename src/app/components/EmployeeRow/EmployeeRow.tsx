import React from "react";
import Image from "next/image";
import { DroppableArea } from "./components/DroppableArea/DroppableArea";
import { IProps } from "./IProps";

const avatars = [
  "/assets/avatar1.jpg",
  "/assets/avatar2.jpg",
  "/assets/avatar3.jpg",
  "/assets/avatar4.jpg",
  "/assets/avatar5.jpg",
];

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
}: IProps) => {
  return (
    <div className="grid grid-cols-8 border-b last:border-b-0 border-gray-200">
      <div className="flex flex-col lg:flex-row items-center p-4 bg-gray-100 items-start">
        <div className="w-8 h-8 relative lg:mr-3">
          <Image
            src={avatars[employeeIndex % avatars.length]}
            alt={`${employee.name}'s avatar`}
            fill
            sizes="32px"
            className="rounded-full"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col items-center md:items-start text-center lg:text-left">
          <span className="text-xs md:text-sm lg:text-base font-medium font-semibold text-gray-700">
            {employee.name}
          </span>
          <span className="text-xs md:text-sm lg:text-base text-gray-500">
            {employee.role}
          </span>
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
