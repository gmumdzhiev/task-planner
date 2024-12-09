import React from "react";
import { ScheduleGrid } from "./components/ScheduleGrid";
import { scheduleData } from "./data/schedule";

const SchedulePage = () => {
  return (
    <main className="p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">Schedule</h1>
      <ScheduleGrid data={scheduleData} />
    </main>
  );
};

export default SchedulePage;
