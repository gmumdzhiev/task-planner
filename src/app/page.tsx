"use client";

import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ScheduleGrid } from "./components/ScheduleGrid";
import { scheduleData } from "./data/schedule";
import { ScheduleData, Employee, Task } from "./types/schedule";
import { Modal } from "./components/Modal";

const SchedulePage = () => {
  const [data, setData] = useState<ScheduleData>(scheduleData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [modalEmployee, setModalEmployee] = useState<Employee | null>(null);
  const [modalDay, setModalDay] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const [activeEmpIdx, activeTaskId] = String(active.id)
      .replace("draggable-", "")
      .split("-");
    const [overEmpIdx, destDayIdxStr] = String(over.id)
      .replace("droppable-", "")
      .split("-");

    const srcEmpIdx = parseInt(activeEmpIdx, 10);
    const destEmpIdx = parseInt(overEmpIdx, 10);
    const destDayIdx = parseInt(destDayIdxStr, 10);

    if (destDayIdx < 0 || destDayIdx >= data.week.length) {
      return;
    }

    const updatedEmployees = [...data.employees];
    const srcEmployee = { ...updatedEmployees[srcEmpIdx] };
    const destEmployee = { ...updatedEmployees[destEmpIdx] };

    const taskIndex = srcEmployee.tasks.findIndex(
      (task) => task.id === activeTaskId
    );

    if (taskIndex !== -1) {
      const [movedTask] = srcEmployee.tasks.splice(taskIndex, 1);
      if (movedTask) {
        movedTask.day = data.week[destDayIdx];
        destEmployee.tasks = [...destEmployee.tasks, movedTask];
      }
    }

    updatedEmployees[srcEmpIdx] = srcEmployee;
    updatedEmployees[destEmpIdx] = destEmployee;

    setData({
      ...data,
      employees: updatedEmployees,
    });
  };

  const handleOpenModal = (
    task: Task | null,
    employee: Employee | null,
    day: string | null
  ) => {
    setModalTask(task);
    setModalEmployee(employee);
    setModalDay(day);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">Schedule</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <ScheduleGrid data={data} onOpenModal={handleOpenModal} />
      </DndContext>
      {isModalOpen && (
        <Modal
          task={modalTask}
          employee={modalEmployee}
          day={modalDay}
          onClose={handleCloseModal}
          employees={data.employees}
        />
      )}
    </main>
  );
};

export default SchedulePage;
