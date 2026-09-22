import "../../global.css";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyTaskState } from "../components/EmptyTaskState";
import { ProgressCard } from "../components/ProgressCard";
import { TaskEditorModal } from "../components/TaskEditorModal";
import { TaskItem } from "../components/TaskItem";
import { TaskTabs } from "../components/TaskTabs";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/task";

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export function HomeScreen() {
  const {
    tasks,
    tab,
    setTab,
    visibleTasks,
    completedCount,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
  } = useTasks();
  const [editorVisible, setEditorVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openNewTask = () => {
    setEditingTask(null);
    setEditorVisible(true);
  };

  const openEditTask = (task: Task) => {
    setEditingTask(task);
    setEditorVisible(true);
  };

  const saveTask = (title: string, notes: string, due: Task["due"]) => {
    if (editingTask) {
      updateTask(editingTask.id, title, notes, due);
    } else {
      addTask(title, notes, due);
    }
    setEditorVisible(false);
  };

  const confirmDelete = (task: Task) => {
    if (Platform.OS === "web") {
      if (
        window.confirm(
          `"${task.title}" will be permanently removed. Delete Task?`,
        )
      ) {
        deleteTask(task.id);
      }
    } else {
      Alert.alert(
        "Delete task?",
        `"${task.title}" will be permanently removed.`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => deleteTask(task.id),
          },
        ],
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-cloud" edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pb-5 pt-5">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-sm font-medium text-muted">{today}</Text>
              <Text className="mt-1 text-[30px] font-bold tracking-tight text-ink">
                My tasks
              </Text>
            </View>
            <View className="h-11 w-11 items-center justify-center rounded-2xl bg-lilac">
              <Text className="text-xl">☀</Text>
            </View>
          </View>
          <ProgressCard
            completedCount={completedCount}
            totalCount={tasks.length}
          />
        </View>

        <View className="px-6">
          <TaskTabs tab={tab} onChange={setTab} />
          <View className="mb-3 mt-7 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-ink">
              {tab === "active" ? "Up next" : "Well done"}
            </Text>
            <Text className="text-sm font-medium text-muted">
              {visibleTasks.length} tasks
            </Text>
          </View>

          {visibleTasks.length === 0 ? (
            <EmptyTaskState tab={tab} />
          ) : (
            visibleTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onEdit={openEditTask}
                onDelete={confirmDelete}
              />
            ))
          )}
        </View>
      </ScrollView>

      <Pressable
        className="absolute bottom-7 right-6 h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg"
        onPress={openNewTask}
        accessibilityLabel="Add task"
      >
        <Text className="text-3xl font-light text-white">+</Text>
      </Pressable>

      <TaskEditorModal
        visible={editorVisible}
        task={editingTask}
        onClose={() => setEditorVisible(false)}
        onSave={saveTask}
      />
    </SafeAreaView>
  );
}
