import { Text, View } from "react-native";

import { TaskTab } from "../types/task";

type EmptyTaskStateProps = {
  tab: TaskTab;
};

export function EmptyTaskState({ tab }: EmptyTaskStateProps) {
  const isActive = tab === "active";

  return (
    <View className="items-center rounded-3xl bg-white px-8 py-12">
      <Text className="text-4xl">{isActive ? "🎉" : "🌱"}</Text>
      <Text className="mt-4 text-lg font-bold text-ink">
        {isActive ? "All clear!" : "No completed tasks yet"}
      </Text>
      <Text className="mt-2 text-center text-sm leading-5 text-muted">
        {isActive
          ? "Enjoy the calm, or add another task."
          : "Complete a task and it will appear here."}
      </Text>
    </View>
  );
}
