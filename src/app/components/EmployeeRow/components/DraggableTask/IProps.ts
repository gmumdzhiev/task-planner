import { Task, Employee } from "../../../../types/schedule";

export interface IProps {
  task: Task;
  employee: Employee;
  day: string | null;
  employeeIndex: number;
  openTaskId: string | null;
  onContextMenuOpen: (taskId: string) => void;
  onOpenModal: (
    task: Task | null,
    employee: Employee | null,
    day: string | null,
    formType: "shift" | "leave" | "edit"
  ) => void;
  onDeleteTask: (employeeIndex: number, taskId: string) => void;
  onCopyTask: (task: Task) => void;
  onPasteTask: (task: Task, day: string, employeeIndex: number) => void;
  copiedTask: Task | null;
}
