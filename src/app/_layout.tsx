import { useTheme } from "@/hooks/use-theme";
import { useAppMetaStore } from "@/store/app-meta-store";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = useTheme();
  const fetchAppMeta = useAppMetaStore((state) => state.fetchAppMeta);

  useEffect(() => {
    fetchAppMeta();
  }, []);

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
              sheetGrabberVisible: false,
              sheetExpandsWhenScrolledToEdge: true,
              sheetInitialDetentIndex: 0,
              sheetCornerRadius: 32,
              sheetElevation: 24,
              sheetAllowedDetents: [0.7],
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
