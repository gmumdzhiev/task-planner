import React, { useState, useEffect } from "react";
import { Employee, Task } from "@/app/types/schedule";
import { calculateCost, calculateTotalHours } from "@/utils/calculations";
import { hourlyRates } from "@/utils/rates";
import { IProps } from "./IProps";

const EditForm = ({ task, employee, day, onClose }: IProps) => {
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
    if (selectedEmployee && day && task) {
      const totalHours = calculateTotalHours(fromHour, toHour, breakTime);
      const hourlyRate = hourlyRates[label];
      const cost = calculateCost(totalHours, hourlyRate);
      const updatedTask: Task = {
        ...task,
        id: task.id,
        startTime: fromHour,
        endTime: toHour,
        label: label,
        totalHours: totalHours,
        nonpbreak: breakTime,
        cost: cost,
        day: day,
        competences: competences,
        attributes: attributes,
        notCounted: notCounted,
      };

      const taskIndex = selectedEmployee.tasks.findIndex(
        (t) => t.id === task.id
      );
      if (taskIndex !== -1) {
        selectedEmployee.tasks[taskIndex] = updatedTask;
      }

      onClose();
    } else {
      alert("Please select an employee and fill in all required fields.");
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Employee <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={selectedEmployee?.name || ""}
          disabled
          className="w-full p-2 border rounded text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">
          Label <span className="text-red-500">*</span>
        </label>
        <select
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full p-2 border rounded bg-gray-100 text-gray-500"
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
          className="w-full p-2 border rounded bg-gray-100 text-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Attributes</label>
        <input
          type="text"
          value={attributes}
          onChange={(e) => setAttributes(e.target.value)}
          className="w-full p-2 border rounded bg-gray-100 text-gray-500"
        />
      </div>
      <div className="mb-4 flex justify-between">
        <div className="w-1/2 pr-2">
          <label className="block text-gray-700">
            From <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            value={fromHour}
            onChange={(e) => setFromHour(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 text-gray-500"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label className="block text-gray-700">
            To <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            value={toHour}
            onChange={(e) => setToHour(e.target.value)}
            className="w-full p-2 border rounded bg-gray-100 text-gray-500"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Non-payable break / Pause</label>
        <input
          type="time"
          value={breakTime}
          onChange={(e) => setBreakTime(e.target.value)}
          className="w-full p-2 border rounded bg-gray-100 text-gray-500"
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
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditForm;