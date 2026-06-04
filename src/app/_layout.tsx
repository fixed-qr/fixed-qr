import { useAppVersion } from "@/hooks/use-app-version";
import { useTheme } from "@/hooks/use-theme";
import { useAppConfigStore } from "@/store/app-config-store";
import { useUserStore } from "@/store/user-store";
import { AppConfig } from "@/types/app-config";
import { versionToVersionCode } from "@/utils/version-to-version-code";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Href, Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function getRedirectPath(
  config: AppConfig,
  currentVersion: number,
): Href | null {
  const { status, release } = config;

  if (status === "online" && currentVersion < release.versionCode) {
    return "/app/update";
  }

  if (status === "maintenance") {
    return "/app/maintenance";
  }

  if (status !== "online") {
    return "/app/discontinued";
  }

  return null;
}

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { version } = useAppVersion();
  const user = useUserStore((state) => state.user);
  const { appConfig, fetchAppConfig } = useAppConfigStore();

  // Fetch app config on mount
  useEffect(() => {
    fetchAppConfig();
  }, []);

  // Version and maintenance redirect
  useEffect(() => {
    const redirectPath = getRedirectPath(
      appConfig,
      versionToVersionCode(version),
    );

    if (redirectPath && pathname !== redirectPath) {
      router.replace(redirectPath);
    }
  }, [appConfig, version, pathname]);

  // Auth guard
  useEffect(() => {
    if (!user && pathname !== "/(auth)/get-started") {
      router.replace("/(auth)/get-started");
    }
  }, [user, pathname]);

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.background.primary }}
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
          <Stack.Screen name="(auth)/get-started" />
          <Stack.Screen name="(protected)" />
          <Stack.Screen name="app" />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
