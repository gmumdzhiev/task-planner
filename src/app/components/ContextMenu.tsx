"use client";

import { useEffect } from "react";

type MenuOption = {
  label: string;
  action: () => void;
};

type ContextMenuProps = {
  options: MenuOption[];
  position: { x: number; y: number };
  onClose: () => void;
};

export const CustomContextMenu = ({ options, onClose }: ContextMenuProps) => {
  useEffect(() => {
    const handleOutsideClick = () => onClose();
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div
      className="absolute bg-white shadow-lg border border-gray-200 rounded-md z-50 overflow-hidden"
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => {
            option.action();
            onClose();
          }}
          className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
