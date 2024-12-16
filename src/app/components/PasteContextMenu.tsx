"use client";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaste } from "@fortawesome/free-solid-svg-icons";

type PasteContextMenuProps = {
  position: { x: number; y: number };
  onPaste: (event: React.MouseEvent) => void;
  onClose: () => void;
};

export const PasteContextMenu = ({
  onPaste,
  onClose,
}: PasteContextMenuProps) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      event.stopPropagation();
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
      <button
        onClick={(event) => {
          onPaste(event);
          onClose();
        }}
        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-1">
          <FontAwesomeIcon icon={faPaste} className="text-gray-600 icon-size" />
          <span className="text-gray-600 font-semibold">Paste</span>
        </div>
      </button>
    </div>
  );
};
