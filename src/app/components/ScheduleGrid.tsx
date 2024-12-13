import React, { useState } from "react";
import { WeekSchedule } from "./WeekSchedule";
import { EmployeeRow } from "./EmployeeRow";
import { ScheduleData, Task, Employee } from "../types/schedule";

interface ScheduleGridProps {
  data: ScheduleData;
  onOpenModal: (
    task: Task | null,
    employee: Employee | null,
    day: string | null
  ) => void;
}

export const ScheduleGrid = ({ data, onOpenModal }: ScheduleGridProps) => {
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);

  const handleContextMenuOpen = (taskId: string) => {
    setOpenTaskId(taskId);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow">
      <div className="grid grid-cols-8 bg-gray-50 shadow-md">
        <div className="flex items-center justify-center p-4 border-r border-gray-200">
          <span className="text-sm font-bold text-gray-600">Employees</span>
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
          />
        ))}
      </div>
    </div>
  );
};
