export type DueOption = "Today" | "Tomorrow" | "Someday";

export type Task = {
  id: string;
  title: string;
  notes: string;
  due: DueOption;
  completed: boolean;
};

export type TaskTab = "active" | "completed";
