import { ScheduleData } from "../types/schedule";

export const scheduleData: ScheduleData = {
  week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  employees: [
    {
      id: "1",
      name: "Alexandre Timmermans",
      role: "Employee",
      tasks: [
        {
          id: "1",
          time: "7:00-15:00",
          label: "Cashier",
          hours: "7h30",
          break: "30",
          cost: "99",
          type: "task",
        },
      ],
    },
    {
      id: "2",
      name: "Eloise Leroy",
      role: "Employee",
      tasks: [
        {
          id: "3",
          time: "8:00-17:00",
          label: "Stock",
          hours: "7h30",
          break: "30",
          cost: "128",
          type: "task",
        },
      ],
    },
  ],
};
