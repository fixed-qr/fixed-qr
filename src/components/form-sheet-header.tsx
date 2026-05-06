import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import { ThemedView } from "./ui";

export function FormSheetHeader() {
  const theme = useTheme();
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.hrLine, { backgroundColor: theme.divider }]} />
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
    height: 6,
    width: "25%",
    minWidth: "15%",
    borderRadius: 100,
  },
});
