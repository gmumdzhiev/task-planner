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
          startTime: "07:00",
          endTime: "15:00",
          label: "Cashier",
          totalHours: "7h30",
          nonpbreak: "00:30",
          cost: "99",
          day: "Mon",
          type: "task",
          competences: "",
          attributes: "",
          notCounted: false,
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
          startTime: "08:00",
          endTime: "17:00",
          totalHours: "8h30",
          label: "Stock",
          nonpbreak: "00:30",
          cost: "102",
          day: "Tue",
          type: "task",
          competences: "",
          attributes: "",
          notCounted: false,
        },
      ],
    },
  ],
};
