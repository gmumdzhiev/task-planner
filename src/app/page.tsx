"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ScheduleGrid } from "./components/ScheduleGrid/ScheduleGrid";
import { scheduleData as initialScheduleData } from "./data/schedule";
import { ScheduleData, Employee, Task } from "./types/schedule";
import { Modal } from "./components/Modal/Modal";

const SchedulePage = () => {
  const [data, setData] = useState<ScheduleData>(initialScheduleData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState<Task | null>(null);
  const [modalEmployee, setModalEmployee] = useState<Employee | null>(null);
  const [modalDay, setModalDay] = useState<string | null>(null);
  const [form, setForm] = useState<"shift" | "leave" | "edit">("shift");
  const [copiedTask, setCopiedTask] = useState<Task | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedData = localStorage.getItem("scheduleData");
      if (savedData) {
        setData(JSON.parse(savedData));
      }
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("scheduleData", JSON.stringify(data));
    }
  }, [data, isClient]);

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
    day: string | null,
    formType: "shift" | "leave" | "edit"
  ) => {
    setModalTask(task);
    setModalEmployee(employee);
    setModalDay(day);
    setIsModalOpen(true);
    setForm(formType);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCopyTask = (task: Task) => {
    setCopiedTask(task);
  };
  const handlePasteTask = (task: Task, day: string, employeeIndex: number) => {
    const updatedEmployees = [...data.employees];
    const employee = {
      ...updatedEmployees[employeeIndex],
    };
    const newTask = {
      ...task,
      id: `${Date.now()}`,
      day,
    };
    employee.tasks = [...employee.tasks, newTask];
    updatedEmployees[employeeIndex] = employee;
    setData({
      ...data,
      employees: updatedEmployees,
    });
    setCopiedTask(null);
  };

  const handleDeleteTask = (employeeIndex: number, taskId: string) => {
    const updatedEmployees = [...data.employees];
    updatedEmployees[employeeIndex].tasks = updatedEmployees[
      employeeIndex
    ].tasks.filter((task) => task.id !== taskId);
    setData({ ...data, employees: updatedEmployees });
  };

  if (!isClient) {
    return null;
  }

  return (
    <main className="p-8 bg-gray-100">
      <div className="flex py-4 items-center">
        <Image
          src="/assets/logo.png"
          alt="Task Planner Logo"
          width={64}
          height={64}
          style={{ objectFit: "cover" }}
        />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold  text-gray-600 px-2 ">
          Schedule
        </h1>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <ScheduleGrid
          data={data}
          onOpenModal={handleOpenModal}
          onCopyTask={handleCopyTask}
          onPasteTask={handlePasteTask}
          copiedTask={copiedTask}
          onDeleteTask={handleDeleteTask}
        />
      </DndContext>
      {isModalOpen && (
        <Modal
          task={modalTask}
          employee={modalEmployee}
          day={modalDay}
          onClose={handleCloseModal}
          employees={data.employees}
          formType={form}
          setFormType={setForm}
        />
      )}
    </main>
  );
};

export default SchedulePage;
