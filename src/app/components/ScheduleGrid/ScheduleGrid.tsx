import React, { useState } from "react";
import { WeekSchedule } from "../WeekSchedule";
import { EmployeeRow } from "../EmployeeRow/EmployeeRow";
import { IProps } from "./IProps";

export const ScheduleGrid = ({
  data,
  onOpenModal,
  onDeleteTask,
  onCopyTask,
  onPasteTask,
  copiedTask,
}: IProps) => {
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);

  const handleContextMenuOpen = (taskId: string) => {
    setOpenTaskId(taskId);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow">
      <div className="grid grid-cols-8 bg-gray-50 shadow-md">
        <div className="flex items-center justify-center p-4 border-r border-gray-200">
          <span className="text-xs md:text-sm lg:text-base font-bold text-gray-600">Employees</span>
        </div>
        <WeekSchedule week={data.week} />
      </div>
      <div className="flex flex-col">
        {data.employees.map((employee, empIndex) => (
          <EmployeeRow
            key={employee.id}
            employee={employee}
            employeeIndex={empIndex}
            week={data.week}
            onOpenModal={onOpenModal}
            openTaskId={openTaskId}
            onContextMenuOpen={handleContextMenuOpen}
            onCopyTask={onCopyTask}
            onPasteTask={onPasteTask}
            copiedTask={copiedTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};
