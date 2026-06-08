import { useAppVersion } from "@/hooks/use-app-version";
import { useTheme } from "@/hooks/use-theme";
import { useAppConfigStore } from "@/store/app-config-store";
import { AppConfig } from "@/types/app-config";
import { versionToVersionCode } from "@/utils/version-to-version-code";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Href, Stack, usePathname, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { version } = useAppVersion();
  const [isReady, setIsReady] = useState(false);
  const appConfig = useAppConfigStore((state) => state.appConfig);
  const fetchAppConfig = useAppConfigStore((state) => state.fetchAppConfig);

  useEffect(() => {
    async function prepare() {
      try {
        await useAppConfigStore.persist.rehydrate();

        await fetchAppConfig();
      } catch (error) {
        console.error(error);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, [fetchAppConfig]);

  useEffect(() => {
    if (!isReady) return;

    const redirectPath = getRedirectPath(
      appConfig,
      versionToVersionCode(version),
    );

    if (redirectPath && pathname !== redirectPath) {
      router.replace(redirectPath);
      return;
    }

    SplashScreen.hideAsync();
  }, [isReady, appConfig, version]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      style={{ flex: 1, backgroundColor: theme.background.primary }}
    >
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
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(protected)" />
            <Stack.Screen name="(system)" />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

function getRedirectPath(
  config: AppConfig,
  currentVersion: number,
): Href | null {
  const { status, release } = config;

  if (status === "online" && currentVersion < release.versionCode) {
    return "/(system)/update";
  }

  if (status === "maintenance") {
    return "/(system)/maintenance";
  }

  if (status !== "online") {
    return "/(system)/discontinued";
  }

  return null;
}
