import { useAppVersion } from "@/hooks/use-app-version";
import { useTheme } from "@/hooks/use-theme";
import { useAppUpdateStore } from "@/store/app-update-store";
import { useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import { AppPressable, AppText, AppView } from "../app-ui";

export function AppUpdateSection() {
  const theme = useTheme();
  const { versionCode } = useAppVersion();

  const checkAppUpdate = useAppUpdateStore((state) => state.checkAppUpdate);
  const isLoading = useAppUpdateStore((state) => state.isLoading);
  const appUpdate = useAppUpdateStore((state) => state.appUpdate);
  const error = useAppUpdateStore((state) => state.error);

  useEffect(() => {
    if (!isLoading && !appUpdate && !error) {
      checkAppUpdate();
    }
  }, [checkAppUpdate]);

  // Decide whether update is available
  const showUpdate = useMemo(() => {
    if (!appUpdate) return false;
    return versionCode < appUpdate.versionCode;
  }, [appUpdate, versionCode]);

  if (isLoading || error || !showUpdate) {
    return null;
  }

  return (
    <AppView
      style={[
        styles.updateSection,
        {
          backgroundColor: theme.background.selected,
        },
      ]}
    >
      <AppText variant="bodyMedium" style={styles.updateTitle}>
        ✨ New update is ready
      </AppText>
      <AppPressable style={styles.updateButton}>
        <AppText variant="button">Update</AppText>
      </AppPressable>
    </AppView>
  );
}

const styles = StyleSheet.create({
  updateSection: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  updateTitle: {
    flex: 1,
  },
  updateButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
  },
});
