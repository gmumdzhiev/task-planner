import React from "react";

export const WeekSchedule = ({ week }: { week: string[] }) => (
  <>
    {week.map((day) => (
      <div
        key={day}
        className={`flex flex-col items-center py-4 border-r last:border-r-0 border-gray-300 bg-gray-200 `}
      >
        <span className="text-sm font-bold text-gray-600">{day}</span>
      </div>
    ))}
  </>
);
