import { Employee, Task } from "../../../../types/schedule";

export interface IProps {
  task: Task | null;
  employee: Employee | null;
  day: string | null;
  onClose: () => void;
  employees: Employee[];
}
