import { borderRadius } from "@/constants/platform";
import { useAppVersion } from "@/hooks/use-app-version";
import { useTheme } from "@/hooks/use-theme";
import { storage } from "@/storage/mmkv";
import { useAppStatusStore } from "@/store/app-status-store";
import { useDataStore } from "@/store/data-store";
import { AppStatus } from "@/types/app-status";
import { versionToNumber } from "@/utils/version-to-number";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

if (!storage.getString("app-status")) {
  storage.set(
    "app-status",
    JSON.stringify({
      code: "ok",
      title: "Service Available",
      message: "Application is running normally.",
      release: null,
    } satisfies AppStatus),
  );
}

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = useTheme();
  const router = useRouter();
  const { version } = useAppVersion();
  const segments = useSegments();
  const pataname = usePathname();
  const user = useDataStore((state) => state.user);
  const { appStatus, fetchAppStatus } = useAppStatusStore();

  useEffect(() => {
    fetchAppStatus();
  }, []);

  useEffect(() => {
    if (appStatus) {
      storage.set("app-status", JSON.stringify(appStatus));
    }

    const cached = storage.getString("app-status");
    if (!cached) return;

    const status = JSON.parse(cached) as AppStatus;
    const currentVersion = versionToNumber(version);

    const shouldBlockApp =
      status.code === "maintenance" ||
      status.code === "discontinued" ||
      (status.code === "deprecated" &&
        currentVersion < (status.release?.version ?? 0));

    // Redirect to app-status
    if (shouldBlockApp && pataname !== "/app-status") {
      router.replace("/app-status");
      return;
    }

    // Leave app-status after update/fix
    if (!shouldBlockApp && pataname === "/app-status") {
      router.replace("/");
    }
  }, [appStatus, version, pataname]);

  useEffect(() => {
    if (!user && pataname !== "/(auth)/get-started") {
      router.replace("/(auth)/get-started");
    }
  }, [segments]);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.background.primary }}
    >
      <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style={scheme === "dark" ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: theme.background.primary },
          }}
        >
          <Stack.Screen name="(auth)/get-started" />
          <Stack.Screen name="app-status" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="(modals)"
            options={{
              presentation: "formSheet",
              gestureDirection: "vertical",
              animation: "slide_from_bottom",
              sheetCornerRadius: borderRadius,
              sheetElevation: 24,
              sheetAllowedDetents: [0.75],
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
