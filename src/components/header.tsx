import { AppTitle } from "@/components/app-title";
import { ThemedView } from "@/components/ui";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export function Header() {
  const theme = useTheme();
  return (
    <ThemedView style={[styles.container]}>
      <ThemedView style={styles.leftContainer}>
        <AppTitle />
      </ThemedView>
      <ThemedView style={styles.rightContainer}>
        <Pressable>
          <Ionicons name="qr-code" size={28} color={theme.text} />
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingTop: spacing[16],
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
