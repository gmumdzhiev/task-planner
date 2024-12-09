"use client";

import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ScheduleGrid } from "./components/ScheduleGrid";
import { scheduleData } from "./data/schedule";
import { ScheduleData } from "./types/schedule";

const SchedulePage = () => {
  const [data, setData] = useState<ScheduleData>(scheduleData);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const [activeEmpIdx, activeTaskId] = String(active.id).split("-");
    const [overEmpIdx, destDayIdxStr] = String(over.id).split("-");

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
        destEmployee.tasks.push(movedTask);
      }
    }

    updatedEmployees[srcEmpIdx] = srcEmployee;
    updatedEmployees[destEmpIdx] = destEmployee;

    setData({
      ...data,
      employees: updatedEmployees,
    });
  };

  return (
    <main className="p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">Schedule</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <ScheduleGrid data={data} />
      </DndContext>
    </main>
  );
};

export default SchedulePage;
