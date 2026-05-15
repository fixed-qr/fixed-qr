import { AppText, AppView } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export function Header() {
  const theme = useTheme();
  return (
    <AppView style={[styles.container]}>
      <AppView style={styles.leftContainer}>
        <AppText
          variant="headingMedium"
          weight="600"
          style={{ color: theme.accent.primary }}
        >
          FixedQR
        </AppText>
      </AppView>
      <AppView style={styles.rightContainer}>
        <Pressable>
          <Ionicons name="qr-code" size={28} color={theme.text.primary} />
        </Pressable>
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
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
