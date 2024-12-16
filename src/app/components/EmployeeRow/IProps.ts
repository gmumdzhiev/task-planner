import { Employee, Task } from "../../types/schedule";

export interface IProps {
  employee: Employee;
  employeeIndex: number;
  week: string[];
  onOpenModal: (
    task: Task | null,
    employee: Employee | null,
    day: string | null,
    formType: "shift" | "leave" | "edit"
  ) => void;
  openTaskId: string | null;
  onContextMenuOpen: (taskId: string) => void;
  onCopyTask: (task: Task) => void;
  onPasteTask: (task: Task, day: string, employeeIndex: number) => void;
  copiedTask: Task | null;
  onDeleteTask: (employeeIndex: number, taskId: string) => void;
}
