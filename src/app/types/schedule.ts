export interface Task {
  id: string;
  label: string;
  startTime: string;
  endTime: string;
  totalHours: string;
  nonpbreak: string;
  cost: string;
  day: string;
  type: "task" | "break";
  competences: string;
  attributes: string;
  notCounted: boolean;
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
