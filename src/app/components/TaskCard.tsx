"use client";

import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import { CustomContextMenu } from "./ContextMenu";

type TaskCardProps = {
  id: string;
  title: string;
};

export const TaskCard = ({ id, title }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  const [contextMenu, setContextMenu] = useState<{
    isVisible: boolean;
    x: number;
    y: number;
  }>({ isVisible: false, x: 0, y: 0 });

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu({ isVisible: true, x: event.clientX, y: event.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ isVisible: false, x: 0, y: 0 });
  };

  const handleCopy = () => {
    console.log(`Copied: ${title}`);
  };

  const handleCreateContract = () => {
    console.log(`Created a contract for: ${title}`);
  };

  const handleDelete = () => {
    console.log(`Deleted: ${title}`);
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onContextMenu={handleRightClick}
      className="bg-white p-4 rounded-lg shadow-sm mb-4 hover:shadow-md transition-shadow duration-200 relative"
    >
      <p className="text-sm text-gray-600">{title}</p>

      {contextMenu.isVisible && (
        <CustomContextMenu
          options={[
            { label: "Copy", action: handleCopy },
            { label: "Create a Contract", action: handleCreateContract },
            { label: "Delete", action: handleDelete },
          ]}
          position={{ x: contextMenu.x, y: contextMenu.y }}
          onClose={handleCloseContextMenu}
        />
      )}
    </div>
  );
};
