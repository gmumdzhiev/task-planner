"use client";

import React, { useState } from "react";
import { Employee, Task } from "../../types/schedule";
import { ShiftForm } from "./components/ShiftForm";
import { LeaveForm } from "./components/LeaveForm";

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
  day,
  onClose,
  employees,
}: ShiftModalProps) => {
  const [formType, setFormType] = useState<"shift" | "leave">("shift");

  const handleFormTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormType(e.target.value as "shift" | "leave");
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      style={{ zIndex: 11 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end"
      onClick={onClose}
    >
      <div
        className="z-12 bg-white w-1/3 h-full p-4 shadow-lg"
        onClick={handleModalClick}
      >
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          Cancel
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {task ? "Edit a shift" : "Create a shift"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Form Type*</label>
          <select
            value={formType}
            onChange={handleFormTypeChange}
            className="w-full p-2 border rounded"
          >
            <option value="shift">Shift</option>
            <option value="leave">Leave</option>
          </select>
        </div>
        {formType === "shift" ? (
          <ShiftForm
            task={task}
            employee={employee}
            day={day}
            onClose={onClose}
            employees={employees}
          />
        ) : (
          <LeaveForm
            task={task}
            employee={employee}
            day={day}
            onClose={onClose}
            employees={employees}
          />
        )}
      </div>
    </div>
  );
};
