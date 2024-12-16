import React, { useState, useEffect } from "react";
import { Employee, Task } from "../../../types/schedule";

interface LeaveFormProps {
  task: Task | null;
  employee: Employee | null;
  day: string | null;
  onClose: () => void;
  employees: Employee[];
}

const hourlyRates: Record<string, number> = {
  Holiday: 15.0,
  Recuperation: 13.0,
};

const calculateTotalHours = (start: string, end: string): string => {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const startDate = new Date();
  startDate.setHours(startHour, startMinute);

  const endDate = new Date();
  endDate.setHours(endHour, endMinute);

  const diffMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

  const hours = Math.floor(diffMinutes / 60);
  const minutes = Math.floor(diffMinutes % 60);

  return `${hours}h${minutes > 0 ? minutes + "m" : ""}`;
};

export const LeaveForm = ({
  task,
  employee,
  day,
  onClose,
  employees,
}: LeaveFormProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    employee
  );
  const [leaveType, setLeaveType] = useState<"Holiday" | "Recuperation">(
    "Holiday"
  );
  const [wholeDay, setWholeDay] = useState(false);
  const [fromHour, setFromHour] = useState(task ? task.startTime : "08:00");
  const [toHour, setToHour] = useState(task ? task.endTime : "17:00");

  useEffect(() => {
    setSelectedEmployee(employee);
  }, [employee]);

  const calculateCost = (totalHours: string, hourlyRate: number): string => {
    if (wholeDay) {
      return "190";
    }
    const [hoursPart, minutesPart] = totalHours.split(/[hm]/).map(Number);
    const totalMinutes = hoursPart * 60 + (minutesPart || 0);
    const totalHoursDecimal = totalMinutes / 60;
    const cost = Math.round(totalHoursDecimal * hourlyRate);
    return cost.toString();
  };

  const handleSubmit = () => {
    if (selectedEmployee && day) {
      const totalHours = calculateTotalHours(fromHour, toHour);
      const hourlyRate = hourlyRates[leaveType];
      const cost = calculateCost(totalHours, hourlyRate);
      const newTask: Task = {
        id: new Date().getTime().toString(),
        startTime: fromHour,
        endTime: toHour,
        label: leaveType,
        totalHours: totalHours,
        nonpbreak: "00:00",
        cost: cost,
        day: day,
        type: "leave",
        competences: "",
        attributes: "",
        notCounted: false,
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
        <label className="block text-gray-700">Employee*</label>
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
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Type of Leave*</label>
        <select
          value={leaveType}
          onChange={(e) =>
            setLeaveType(e.target.value as "Holiday" | "Recuperation")
          }
          className="w-full p-2 border rounded"
        >
          <option value="Holiday">Holiday</option>
          <option value="Recuperation">Recuperation</option>
        </select>
      </div>
      <div className="mb-4">
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
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={wholeDay}
            onChange={(e) => setWholeDay(e.target.checked)}
            className="form-checkbox"
          />
          <span className="ml-2 text-gray-700">Whole day</span>
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
          Create Leave
        </button>
      </div>
    </div>
  );
};
