"use client";

import React, { useState, useEffect } from "react";
import { Employee, Task } from "../../types/schedule";
import { ShiftForm } from "./components/ShiftForm";
import { LeaveForm } from "./components/LeaveForm";
import EditForm from "./components/EditForm";

interface ShiftModalProps {
  task: Task | null;
  employee: Employee | null;
  day: string | null;
  onClose: () => void;
  employees: Employee[];
  formType: string;
  setFormType: (formType: "shift" | "leave" | "edit") => void;
}

export const Modal = ({
  task,
  employee,
  day,
  onClose,
  employees,
  formType,
  setFormType,
}: ShiftModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFormTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormType(e.target.value as "shift" | "leave");
  };

  const handleModalClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      style={{ zIndex: 11 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end"
      onClick={handleClose}
    >
      <div
        className={`z-12 bg-white w-1/3 h-full p-4 shadow-lg transition-transform duration-300 ${
          isVisible ? "animate-slideIn" : "animate-slideOut"
        }`}
        onClick={handleModalClick}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          {task ? "Edit a shift" : "Create a shift"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">
            Form Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formType}
            onChange={handleFormTypeChange}
            className="w-full p-2 border rounded bg-gray-100 text-gray-500"
          >
            <option className="text-gray-500" value="shift">
              Shift
            </option>
            <option className="text-gray-500" value="leave">
              Leave
            </option>
          </select>
        </div>
        {formType === "shift" ? (
          <ShiftForm
            task={task}
            employee={employee}
            day={day}
            onClose={handleClose}
            employees={employees}
          />
        ) : formType === "leave" ? (
          <LeaveForm
            task={task}
            employee={employee}
            day={day}
            onClose={handleClose}
            employees={employees}
          />
        ) : (
          <EditForm
            task={task}
            employee={employee}
            day={day}
            onClose={handleClose}
            employees={employees}
          />
        )}
      </div>
    </div>
  );
};
