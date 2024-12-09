import React from "react";
import { Employee } from "../types/schedule";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faPause,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

interface EmployeeRowProps {
  employee: Employee;
}

export const EmployeeRow = ({ employee }: EmployeeRowProps) => {
  return (
    <div className="grid grid-cols-8 border-b last:border-b-0 border-gray-200">
      <div className="flex flex-col items-start justify-center p-4 bg-gray-100">
        <span className="text-sm font-medium font-semibold text-gray-700">
          {employee.name}
        </span>
        <span className="text-xs text-gray-500">{employee.role}</span>
      </div>

      {Array(7)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-2"
          >
            {employee.tasks.map(
              (task) =>
                task.id === `${index + 1}` && (
                  <div
                    key={task.id}
                    className={`flex flex-col items-start w-full p-2 rounded-md shadow ${
                      task.type === "break"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-lime-200 text-green-600"
                    }`}
                  >
                    <span className="py-1 text-base font-semibold text-gray-700">
                      {task.time}
                    </span>
                    <div className="py-1 flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon
                          icon={faClock}
                          className="text-gray-500 icon-size"
                        />
                        <span className="text-gray-500 text-xs font-medium">
                          {task.hours}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon
                          icon={faPause}
                          className="text-gray-500 icon-size"
                        />
                        <span className="text-gray-500 text-xs font-medium">
                          {task.break}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon
                          icon={faMoneyBill}
                          className="text-gray-500 icon-size"
                        />
                        <span className="text-gray-500 text-xs font-medium">
                          {task.cost} €
                        </span>
                      </div>
                    </div>
                    <span className="py-1 w-full text-xs font-semibold rounded-md shadow bg-lime-600 text-gray-700 px-2">
                      {task.label}
                    </span>
                  </div>
                )
            )}
          </div>
        ))}
    </div>
  );
};
