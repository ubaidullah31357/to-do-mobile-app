import { Pressable, Text, View } from "react-native";

import { TaskTab } from "../types/task";

type TaskTabsProps = {
  tab: TaskTab;
  onChange: (tab: TaskTab) => void;
};

export function TaskTabs({ tab, onChange }: TaskTabsProps) {
  return (
    <View className="flex-row rounded-2xl bg-white p-1">
      {(["active", "completed"] as const).map((item) => (
        <Pressable
          key={item}
          className={`flex-1 rounded-xl py-3 ${
            tab === item ? "bg-ink" : "bg-transparent"
          }`}
          onPress={() => onChange(item)}
        >
          <Text
            className={`text-center text-sm font-semibold ${
              tab === item ? "text-white" : "text-muted"
            }`}
          >
            {item === "active" ? "To-do" : "Completed"}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
