"use client";

import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  id: string;
  title: string;
};

export const TaskCard = ({ id, title }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white p-4 rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow duration-200"
    >
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );
};
