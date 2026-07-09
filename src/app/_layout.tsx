import { useUserStore } from "@/features/user/store";
import { useTheme } from "@/hooks/use-theme";
import { SheetProvider } from "@/sheets/components/sheet-provider";
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
    <GestureHandlerRootView
      onLayout={onLayoutRootView}
      style={{
        flex: 1,
        backgroundColor: theme.background.primary,
      }}
    >
      <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider
          initialMetrics={initialWindowMetrics}
          style={{
            flex: 1,
            backgroundColor: theme.background.primary,
          }}
        >
          <SheetProvider>
            <StatusBar style={scheme === "dark" ? "light" : "dark"} />

            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: {
                  backgroundColor: theme.background.primary,
                },
              }}
            >
              <Stack.Screen
                name="(auth)/get-started"
                options={{ animation: "fade" }}
              />
              <Stack.Screen name="(system)" />
              <Stack.Screen name="(protected)" />
            </Stack>
          </SheetProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
