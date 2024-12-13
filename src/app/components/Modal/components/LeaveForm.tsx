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

export const LeaveForm = ({
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
  const [hours, setHours] = useState("08:00");
  const [wholeDay, setWholeDay] = useState(false);

  useEffect(() => {
    setSelectedEmployee(employee);
  }, [employee]);

  const calculateCost = (hours: string, hourlyRate: number): string => {
    if (wholeDay) {
      return "190";
    }
    const [hoursPart, minutesPart] = hours.split(":").map(Number);
    const totalMinutes = hoursPart * 60 + (minutesPart || 0);
    const totalHoursDecimal = totalMinutes / 60;
    const cost = Math.round(totalHoursDecimal * hourlyRate);
    return cost.toString();
  };

  const handleSubmit = () => {
    if (selectedEmployee && day) {
      const hourlyRate = hourlyRates[leaveType];
      const cost = calculateCost(hours, hourlyRate);
      const newTask: Task = {
        id: new Date().getTime().toString(),
        startTime: "00:00",
        endTime: "23:59",
        label: leaveType,
        totalHours: wholeDay ? "24h" : hours,
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
        <label className="block text-gray-700">Hours*</label>
        <input
          type="time"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={wholeDay}
        />
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={wholeDay}
            onChange={(e) => setWholeDay(e.target.checked)}
            className="form-checkbox"
          />
          <span className="ml-2 text-gray-700">Whole day (€190)</span>
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
