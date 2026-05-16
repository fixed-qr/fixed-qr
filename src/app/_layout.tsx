import { borderRadius } from "@/constants/platform";
import { useGoogleDriveJson } from "@/hooks/use-google-drive-json";
import { useTheme } from "@/hooks/use-theme";
import { storage } from "@/storage/mmkv";
import { AppMetaData } from "@/types/app-meta-data";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = useTheme();
  const router = useRouter();
  const { data, loading, error } = useGoogleDriveJson<AppMetaData>(
    "1EPmnn5D3pMaFMdSOdEiddOertE4IAlCF",
  );

  useEffect(() => {
    if (!storage.getString("app-status")) {
      storage.set("app-status", "ok");
    }

    if (data && storage.getString("app-status") !== data.status) {
      storage.set("app-status", data.status);
    }

    if (storage.getString("app-status") !== "ok") {
      router.replace("/banned");
    }
  }, [data, loading, error]);

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
          <Stack.Screen name="banned" />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
