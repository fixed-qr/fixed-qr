import { ThemedText } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";

export function AppTitle() {
  const theme = useTheme();
  return (
    <ThemedText style={[styles.appTitle, { color: theme.accent.primary }]}>
      FixedQR
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
