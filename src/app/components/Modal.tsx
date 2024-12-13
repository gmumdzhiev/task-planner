"use client";

import React, { useState, useEffect } from "react";
import { Employee, Task } from "../types/schedule";

interface ShiftModalProps {
  task: Task | null;
  employee: Employee | null;
  day: string | null;
  onClose: () => void;
  employees: Employee[];
}

export const Modal = ({
  task,
  employee,
  onClose,
  employees,
}: ShiftModalProps) => {
  const [shiftType, setShiftType] = useState(task ? task.type : "shift");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    employee
  );
  const [label, setLabel] = useState(task ? task.label : "");
  const [competences, setCompetences] = useState(task ? task.competences : "");
  const [attributes, setAttributes] = useState(task ? task.attributes : "");
  const [fromHour, setFromHour] = useState(task ? task.startTime : "08:00");
  const [toHour, setToHour] = useState(task ? task.endTime : "17:00");
  const [breakTime, setBreakTime] = useState(task ? task.break : "00:30");
  const [notCounted, setNotCounted] = useState(task ? task.notCounted : false);
  useEffect(() => {
    setSelectedEmployee(employee);
  }, [employee]);
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end">
      <div className="bg-white w-1/3 h-full p-4 shadow-lg">
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          Cancel
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {task ? "Edit a shift" : "Create a shift"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Type*</label>
          <select
            value={shiftType}
            onChange={(e) => setShiftType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="shift">Shift</option>
            <option value="absence">Absence</option>
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
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full p-2 border rounded"
          />
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
          <label className="block text-gray-700">
            Non-payable break / Pause
          </label>
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
            {selectedEmployee?.tasks ? "Edit Shift" : "Create Shift"}
          </button>
        </div>
      </div>
    </div>
  );
};
