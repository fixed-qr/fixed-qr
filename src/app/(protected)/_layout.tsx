import { useAppUpdateStore } from "@/features/app-update/store";
import { useAppVersion } from "@/hooks/use-app-version";
import { useUserStore } from "@/store/user-store";
import { Redirect, Stack, usePathname } from "expo-router";
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

export default function ProtectedLayout() {
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);

  const { versionCode } = useAppVersion();
  const { checkAppUpdate, appUpdate, isLoading, error } = useAppUpdateStore(
    useShallow((state) => state),
  );

  useEffect(() => {
    if (!isLoading && !error) {
      checkAppUpdate();
    }
  }, [checkAppUpdate]);

  // Decide whether update is available
  const showUpdate = useMemo(() => {
    if (!appUpdate) return false;
    return versionCode < appUpdate.versionCode;
  }, [appUpdate, versionCode]);

  if (!user && pathname !== "/(auth)/get-started") {
    return <Redirect href="/(auth)/get-started" />;
  }

  if (!isLoading && !error && showUpdate && pathname !== "/(system)/update") {
    return <Redirect href={"/(system)/update"} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: undefined },
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
