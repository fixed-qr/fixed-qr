import { AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";

export function FormSheetHeader() {
  const theme = useTheme();
  return (
    <AppView
      style={[
        styles.container,
        { backgroundColor: theme.background.secondary },
      ]}
    >
      <AppView style={[styles.hrLine, { backgroundColor: theme.text.muted }]} />
    </AppView>
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
