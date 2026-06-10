import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import { AppPressable, AppText, AppView } from "../app-ui";

export function AppUpdateSection() {
  const theme = useTheme();

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
