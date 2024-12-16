import { Task, Employee } from "../../../../types/schedule";

export interface IProps {
    employeeIndex: number;
    dayIndex: number;
    tasks: Task[];
    openTaskId: string | null;
    onContextMenuOpen: (taskId: string) => void;
    onOpenModal: (
      task: Task | null,
      employee: Employee | null,
      day: string | null,
      formType: "shift" | "leave" | "edit"
    ) => void;
    employee: Employee;
    day: string;
    onCopyTask: (task: Task) => void;
    onPasteTask: (task: Task, day: string, employeeIndex: number) => void;
    copiedTask: Task | null;
    onDeleteTask: (employeeIndex: number, taskId: string) => void;
}