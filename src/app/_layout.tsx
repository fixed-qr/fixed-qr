import { borderRadius } from "@/constants/platform";
import { useGoogleDriveJson } from "@/hooks/use-google-drive-json";
import { useTheme } from "@/hooks/use-theme";
import { storage } from "@/storage/mmkv";
import { useDataStore } from "@/store/data-store";
import { AppMetaData } from "@/types/app-meta-data";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

if (!storage.getString("app-status")) {
  storage.set(
    "app-status",
    JSON.stringify({
      status: {
        code: "ok",
        title: "Service Available",
        message: "Application is running normally.",
      },
      release: null,
    }),
  );
}

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = useTheme();
  const router = useRouter();
  const segments = useSegments();
  const user = useDataStore((state) => state.user);

  const { data } = useGoogleDriveJson<AppMetaData>(
    "1EPmnn5D3pMaFMdSOdEiddOertE4IAlCF",
  );

  useEffect(() => {
    if (data) {
      storage.set("app-status", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    const appData = JSON.parse(
      storage.getString("app-status") as string,
    ) as AppMetaData;

    if (appData.status.code !== "ok") {
      router.replace("/app-status");
    }
  }, [data, segments]);

  useEffect(() => {
    if (!user) {
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
