import { Pressable, Text, View } from "react-native";

import { Task } from "../types/task";

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
};

export function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <View className="mb-3 rounded-3xl bg-white px-4 py-4">
      <View className="flex-row items-start">
        <Pressable
          className={`mr-3 mt-0.5 h-6 w-6 items-center justify-center rounded-full border-2 ${
            task.completed
              ? "border-primary bg-primary"
              : "border-slate-300"
          }`}
          onPress={() => onToggle(task.id)}
          accessibilityLabel={
            task.completed ? "Mark task incomplete" : "Mark task complete"
          }
        >
          {task.completed && (
            <Text className="text-xs font-bold text-white">✓</Text>
          )}
        </Pressable>
        <Pressable className="flex-1" onPress={() => onEdit(task)}>
          <Text
            className={`text-base font-bold ${
              task.completed ? "text-muted line-through" : "text-ink"
            }`}
          >
            {task.title}
          </Text>
          {!!task.notes && (
            <Text className="mt-1 text-sm leading-5 text-muted">
              {task.notes}
            </Text>
          )}
          <View className="mt-3 flex-row items-center">
            <Text className="text-xs font-semibold text-primary">
              ◷ {task.due}
            </Text>
            <Text className="ml-3 text-xs font-medium text-muted">
              Tap to edit
            </Text>
          </View>
        </Pressable>
        <Pressable
          className="ml-2 p-1"
          onPress={() => onDelete(task)}
          accessibilityLabel="Delete task"
        >
          <Text className="text-lg text-slate-300">⌫</Text>
        </Pressable>
      </View>
    </View>
  );
}
