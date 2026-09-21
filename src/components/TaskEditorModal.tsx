import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

import { DueOption, Task } from "../types/task";

type TaskEditorModalProps = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (title: string, notes: string, due: DueOption) => void;
};

const dueOptions: DueOption[] = ["Today", "Tomorrow", "Someday"];

export function TaskEditorModal({
  visible,
  task,
  onClose,
  onSave,
}: TaskEditorModalProps) {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [due, setDue] = useState<DueOption>("Today");

  useEffect(() => {
    if (visible) {
      setTitle(task?.title ?? "");
      setNotes(task?.notes ?? "");
      setDue(task?.due ?? "Today");
    }
  }, [task, visible]);

  const save = () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      Alert.alert("Add a title", "Give your task a short, clear title.");
      return;
    }

    onSave(cleanTitle, notes.trim(), due);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        className="flex-1 justify-end bg-black/30"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View className="rounded-t-[32px] bg-white px-6 pb-8 pt-5">
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-ink">
              {task ? "Edit task" : "New task"}
            </Text>
            <Pressable
              onPress={onClose}
              className="h-9 w-9 items-center justify-center rounded-full bg-cloud"
            >
              <Text className="text-lg text-muted">×</Text>
            </Pressable>
          </View>
          <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">
            Title
          </Text>
          <TextInput
            className="mb-5 rounded-2xl bg-cloud px-4 py-4 text-base text-ink"
            value={title}
            onChangeText={setTitle}
            placeholder="What needs to be done?"
            placeholderTextColor="#A4ADBA"
            autoFocus
          />
          <Text className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">
            Notes
          </Text>
          <TextInput
            className="mb-5 min-h-[82px] rounded-2xl bg-cloud px-4 py-4 text-base text-ink"
            value={notes}
            onChangeText={setNotes}
            placeholder="Add a little context (optional)"
            placeholderTextColor="#A4ADBA"
            multiline
            textAlignVertical="top"
          />
          <Text className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">
            Due
          </Text>
          <View className="mb-7 flex-row">
            {dueOptions.map((option) => (
              <Pressable
                key={option}
                className={`mr-2 rounded-xl px-4 py-3 ${
                  due === option ? "bg-lilac" : "bg-cloud"
                }`}
                onPress={() => setDue(option)}
              >
                <Text
                  className={`text-sm font-semibold ${
                    due === option ? "text-primary" : "text-muted"
                  }`}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            className="items-center rounded-2xl bg-primary py-4"
            onPress={save}
          >
            <Text className="text-base font-bold text-white">
              {task ? "Save changes" : "Add task"}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
