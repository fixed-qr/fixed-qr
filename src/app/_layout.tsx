import { useTheme } from "@/hooks/use-theme";
import { useUserStore } from "@/store/user-store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useRef, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = useTheme();

  const splashHiddenRef = useRef(false);

  const [hasHydrated, setHasHydrated] = useState(
    useUserStore.persist.hasHydrated(),
  );

  useEffect(() => {
    if (useUserStore.persist.hasHydrated()) {
      setHasHydrated(true);
      return;
    }

    const unsubscribe = useUserStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    return unsubscribe;
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!hasHydrated || splashHiddenRef.current) {
      return;
    }

    splashHiddenRef.current = true;

    try {
      await SplashScreen.hideAsync();
    } catch {
      // ignore
    }
  }, [hasHydrated]);

  if (!hasHydrated) {
    return null;
  }

  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={{
        flex: 1,
        backgroundColor: theme.background.primary,
      }}
    >
      <GestureHandlerRootView
        onLayout={onLayoutRootView}
        style={{
          flex: 1,
          backgroundColor: theme.background.primary,
        }}
      >
        <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
          <StatusBar style={scheme === "dark" ? "light" : "dark"} />

          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: theme.background.primary,
              },
            }}
          >
            <Stack.Screen name="(auth)" options={{ animation: "fade" }} />
            <Stack.Screen name="(system)" options={{ animation: "fade" }} />
            <Stack.Screen name="(protected)" options={{ animation: "fade" }} />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
