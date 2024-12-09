"use client";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { DayColumn } from "./DayColumn";
import { initialData } from "../data/fakeData";

export const DragDropContext = () => {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setData((prevState) => {
      const tasks = [...prevState.tasks];
      const activeTaskIndex = tasks.findIndex((task) => task.id === active.id);
      const overTaskIndex = tasks.findIndex((task) => task.id === over.id);

      if (
        activeTaskIndex !== -1 &&
        overTaskIndex !== -1 &&
        tasks[activeTaskIndex].day === tasks[overTaskIndex].day
      ) {
        const dayTasks = tasks.filter(
          (task) => task.day === tasks[activeTaskIndex].day
        );
        const reorderedDayTasks = arrayMove(
          dayTasks,
          activeTaskIndex,
          overTaskIndex
        );

        return {
          ...prevState,
          tasks: [
            ...tasks.filter((task) => task.day !== tasks[activeTaskIndex].day),
            ...reorderedDayTasks,
          ],
        };
      }

      tasks[activeTaskIndex].day = over.id as string;
      return { ...prevState, tasks };
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-6 underline">
          Planning Screen
        </h1>
        <div className="flex gap-6 overflow-x-auto">
          {isClient &&
            data.days.map((day) => (
              <DayColumn
                key={day}
                day={day}
                tasks={data.tasks.filter((task) => task.day === day)}
              />
            ))}
        </div>
      </div>
    </DndContext>
  );
};
