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
          time: "07:00-15:00",
          label: "Cashier",
          hours: "7h30",
          break: "30m",
          cost: "99",
          day: "Mon",
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
          time: "08:00-17:00",
          label: "Stock",
          hours: "7h30",
          break: "30m",
          cost: "128",
          day: "Tue",
          type: "task",
        },
      ],
    },
  ],
};
