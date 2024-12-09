import React from "react";
import { WeekSchedule } from "./WeekSchedule";
import { EmployeeRow } from "./EmployeeRow";
import { ScheduleData } from "../types/schedule";

interface ScheduleGridProps {
  data: ScheduleData;
}

export const ScheduleGrid = ({ data }: ScheduleGridProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow">
      <div className="grid grid-cols-8 bg-gray-50 shadow-md">
        <div className="flex items-center justify-center p-4 border-r border-gray-200">
          <span className="text-sm font-bold text-gray-600">Employees</span>
        </div>
        <WeekSchedule week={data.week} />
      </div>

      <div className="flex flex-col">
        {data.employees.map((employee) => (
          <EmployeeRow key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};
