import "../../global.css";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

type SplashScreenProps = {
  onFinished: () => void;
};

export function SplashScreen({ onFinished }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onFinished, 1500);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <StatusBar style="light" />
      <View className="mb-5 h-20 w-20 items-center justify-center rounded-[26px] bg-white">
        <Text className="text-4xl font-bold text-primary">✓</Text>
      </View>
      <Text className="text-3xl font-bold tracking-tight text-white">
        Done.
      </Text>
      <Text className="mt-2 text-sm text-indigo-100">Splash Screen.</Text>
    </View>
  );
}
