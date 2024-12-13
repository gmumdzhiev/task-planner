import React, { useState, useEffect } from "react";
import { Employee, Task } from "../../../types/schedule";

interface ShiftFormProps {
  task: Task | null;
  employee: Employee | null;
  day: string | null;
  onClose: () => void;
  employees: Employee[];
}

const hourlyRates: Record<string, number> = {
  Opening: 10.4,
  Closing: 13.08,
  Cashier: 13.2,
  Stock: 12.0,
  Truck: 13.07,
};

const calculateTotalHours = (
  start: string,
  end: string,
  breakTime: string
): string => {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  const [breakHour, breakMinute] = breakTime.split(":").map(Number);
  const startDate = new Date();
  startDate.setHours(startHour, startMinute);
  const endDate = new Date();
  endDate.setHours(endHour, endMinute);
  const breakDuration = breakHour * 60 + breakMinute;
  const diffMinutes =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60) - breakDuration;
  const hours = Math.floor(diffMinutes / 60);
  const minutes = Math.floor(diffMinutes % 60);
  return `${hours}h${minutes > 0 ? minutes + "m" : ""}`;
};

const calculateCost = (totalHours: string, hourlyRate: number): string => {
  const [hours, minutes] = totalHours.split(/[hm]/).map(Number);
  const totalMinutes = hours * 60 + (minutes || 0);
  const totalHoursDecimal = totalMinutes / 60;
  const cost = Math.round(totalHoursDecimal * hourlyRate);
  return cost.toString();
};

export const ShiftForm = ({
  task,
  employee,
  day,
  onClose,
  employees,
}: ShiftFormProps) => {
  const [shiftType, setShiftType] = useState<"task" | "leave">(
    task ? task.type : "task"
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    employee
  );
  const [label, setLabel] = useState(task ? task.label : "Cashier");
  const [competences, setCompetences] = useState(task ? task.competences : "");
  const [attributes, setAttributes] = useState(task ? task.attributes : "");
  const [fromHour, setFromHour] = useState(task ? task.startTime : "08:00");
  const [toHour, setToHour] = useState(task ? task.endTime : "17:00");
  const [breakTime, setBreakTime] = useState(task ? task.nonpbreak : "00:30");
  const [notCounted, setNotCounted] = useState(task ? task.notCounted : false);

  useEffect(() => {
    setSelectedEmployee(employee);
  }, [employee]);

  const handleSubmit = () => {
    if (selectedEmployee && day) {
      const totalHours = calculateTotalHours(fromHour, toHour, breakTime);
      const hourlyRate = hourlyRates[label];
      const cost = calculateCost(totalHours, hourlyRate);
      const newTask: Task = {
        id: new Date().getTime().toString(),
        startTime: fromHour,
        endTime: toHour,
        label: label,
        totalHours: totalHours,
        nonpbreak: breakTime,
        cost: cost,
        day: day,
        type: shiftType,
        competences: competences,
        attributes: attributes,
        notCounted: notCounted,
      };
      selectedEmployee.tasks.push(newTask);
      onClose();
    } else {
      alert("Please select an employee and fill in all required fields.");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">Type*</label>
        <select
          value={shiftType}
          onChange={(e) => setShiftType(e.target.value as "task" | "leave")}
          className="w-full p-2 border rounded"
        >
          <option value="task">Task</option>
          <option value="break">Break</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Employee*</label>
        {task ? (
          <input
            type="text"
            value={selectedEmployee?.name || ""}
            disabled
            className="w-full p-2 border rounded"
          />
        ) : (
          <select
            value={selectedEmployee?.id || ""}
            onChange={(e) =>
              setSelectedEmployee(
                employees.find((emp) => emp.id === e.target.value) || null
              )
            }
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>
              Select an employee
            </option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.name}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Label*</label>
        <select
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Opening">Opening</option>
          <option value="Closing">Closing</option>
          <option value="Cashier">Cashier</option>
          <option value="Stock">Stock</option>
          <option value="Truck">Truck</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Competences</label>
        <input
          type="text"
          value={competences}
          onChange={(e) => setCompetences(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Attributes</label>
        <input
          type="text"
          value={attributes}
          onChange={(e) => setAttributes(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4 flex justify-between">
        <div className="w-1/2 pr-2">
          <label className="block text-gray-700">From*</label>
          <input
            type="time"
            value={fromHour}
            onChange={(e) => setFromHour(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label className="block text-gray-700">To*</label>
          <input
            type="time"
            value={toHour}
            onChange={(e) => setToHour(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Non-payable break / Pause</label>
        <input
          type="time"
          value={breakTime}
          onChange={(e) => setBreakTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={notCounted}
            onChange={(e) => setNotCounted(e.target.checked)}
            className="form-checkbox"
          />
          <span className="ml-2 text-gray-700">
            Shift not counted in hours worked
          </span>
        </label>
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          {task ? "Edit Shift" : "Create Shift"}
        </button>
      </div>
    </div>
  );
};
