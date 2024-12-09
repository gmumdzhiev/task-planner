type Task = {
    id: string;
    title: string;
    day: string;
  };
  
  type InitialData = {
    tasks: Task[];
    days: string[]; 
  };
  
  export const initialData: InitialData = {
    tasks: [
      { id: "1", title: "Task 1", day: "Monday" },
      { id: "2", title: "Task 2", day: "Tuesday" },
    ],
    days: ["Monday", "Tuesday", "Wednesday"],
  };
  