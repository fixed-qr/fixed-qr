import { AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { DevButton } from "./dev-button";

export function Header() {
  const theme = useTheme();
  const expand = useBottomSheetStore((state) => state.expand);

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
        <Pressable
          style={styles.button}
          onPress={() => {
            expand("qr-sheet");
          }}
        >
          <Ionicons name="qr-code" size={24} color={theme.text.primary} />
        </Pressable>
        <DevButton />
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
    gap: 12,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
