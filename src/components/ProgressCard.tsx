import { Text, View } from "react-native";

type ProgressCardProps = {
  completedCount: number;
  totalCount: number;
};

export function ProgressCard({
  completedCount,
  totalCount,
}: ProgressCardProps) {
  const percentage = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  return (
    <View className="mt-7 rounded-3xl bg-primary px-5 py-5">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-medium text-indigo-100">
            Your progress
          </Text>
          <Text className="mt-1 text-2xl font-bold text-white">
            {completedCount} of {totalCount} completed
          </Text>
        </View>
        <View className="h-14 w-14 items-center justify-center rounded-full border-4 border-indigo-300">
          <Text className="text-sm font-bold text-white">{percentage}%</Text>
        </View>
      </View>
      <View className="mt-5 h-2 overflow-hidden rounded-full bg-indigo-400">
        <View
          className="h-full rounded-full bg-white"
          style={{ width: `${percentage}%` }}
        />
      </View>
    </View>
  );
}
