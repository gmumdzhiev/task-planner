export interface Task {
  id: string;
  time: string;
  label: string;
  hours: string;
  break: string;
  cost: string;
  type: "task" | "break";
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  tasks: Task[];
}

export interface ScheduleData {
  week: string[];
  employees: Employee[];
}
