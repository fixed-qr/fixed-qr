import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ui";

export function FormSheetHeader() {
  const theme = useTheme();
  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: theme.background.secondary },
      ]}
    >
      <ThemedView
        style={[styles.hrLine, { backgroundColor: theme.text.muted }]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  hrLine: {
    width: 36,
    height: 4,
    borderRadius: 4,
  },
});
