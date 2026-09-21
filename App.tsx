import "./global.css";

import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { SplashScreen } from "./src/components/SplashScreen";
import { HomeScreen } from "./src/screens/HomeScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <SafeAreaProvider>
      {showSplash ? (
        <SplashScreen onFinished={() => setShowSplash(false)} />
      ) : (
        <HomeScreen />
      )}
    </SafeAreaProvider>
  );
}
