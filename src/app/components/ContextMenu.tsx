"use client";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type MenuOption = {
  label: string;
  icon: IconProp;
  color: string;
  action: (event: React.MouseEvent) => void;
};

type ContextMenuProps = {
  options: MenuOption[];
  position: { x: number; y: number };
  onClose: () => void;
};

export const ContextMenu = ({ options, onClose }: ContextMenuProps) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        event.target instanceof HTMLElement &&
        !event.target.closest(".context-menu")
      ) {
        onClose();
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div
      className="absolute bg-white shadow-lg border border-gray-200 rounded-md z-50 overflow-hidden context-menu"
      style={{ top: `65px`, left: `45px` }}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={(event) => {
            option.action(event);
            onClose();
          }}
          className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-1">
            <FontAwesomeIcon
              icon={option.icon}
              className={`${
                option.color === "base" ? "text-gray-600" : "text-rose-400"
              } icon-size`}
            />

            <span
              className={`${
                option.color === "base" ? "text-gray-600" : "text-rose-400"
              } font-semibold`}
            >
              {option.label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};
