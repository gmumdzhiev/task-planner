import React, { useState, useEffect } from "react";
import { Employee, Task } from "../../../../types/schedule";
import { calculateLeaveTotalHours } from "@/utils/calculations";
import { hourlyLeaveRates } from "@/utils/rates";
import { IProps } from "./IProps";

export const LeaveForm = ({
  task,
  employee,
  day,
  onClose,
  employees,
}: IProps) => {
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

  useEffect(() => {
    if (wholeDay) {
      setFromHour("");
      setToHour("");
    } else {
      setFromHour(task ? task.startTime : "08:00");
      setToHour(task ? task.endTime : "17:00");
    }
  }, [wholeDay, task]);

  const calculateCost = (totalHours: string, hourlyRate: number): string => {
    const [hoursPart, minutesPart] = totalHours.split(/[hm]/).map(Number);
    const totalMinutes = hoursPart * 60 + (minutesPart || 0);
    const totalHoursDecimal = totalMinutes / 60;
    const cost = Math.round(totalHoursDecimal * hourlyRate);
    return cost.toString();
  };

  const handleSubmit = () => {
    if (selectedEmployee && day) {
      const totalHours = calculateLeaveTotalHours(fromHour, toHour);
      const hourlyRate = hourlyLeaveRates[leaveType];
      const cost = calculateCost(totalHours, hourlyRate);
      const newTask: Task = {
        id: new Date().getTime().toString(),
        startTime: fromHour,
        endTime: toHour,
        label: leaveType,
        totalHours: wholeDay ? "12h40" : totalHours,
        nonpbreak: "00:00",
        cost: wholeDay ? "190" : cost,
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
      <div className="flex w-full justify-end gap-2">
        <button
          className="w-full bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="w-full bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          Create Leave
        </button>
      </div>
    </div>
  );
};
