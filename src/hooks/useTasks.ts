import { useState } from "react";

import { starterTasks } from "../data/starterTasks";
import { DueOption, Task, TaskTab } from "../types/task";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(starterTasks);
  const [tab, setTab] = useState<TaskTab>("active");

  const visibleTasks = tasks.filter((task) =>
    tab === "completed" ? task.completed : !task.completed,
  );

  const completedCount = tasks.filter((task) => task.completed).length;

  const addTask = (title: string, notes: string, due: DueOption) => {
    setTasks((current) => [
      {
        id: Date.now().toString(),
        title,
        notes,
        due,
        completed: false,
      },
      ...current,
    ]);
    setTab("active");
  };

  const updateTask = (
    id: string,
    title: string,
    notes: string,
    due: DueOption,
  ) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, title, notes, due } : task,
      ),
    );
  };

  const toggleTask = (id: string) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return {
    tasks,
    tab,
    setTab,
    visibleTasks,
    completedCount,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
  };
}
