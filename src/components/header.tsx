import { AppAnimatedPressable, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { AppLogo } from "./app-logo";
import { AppName } from "./app-name";

export function Header() {
  const theme = useTheme();
  const expand = useBottomSheetStore((state) => state.expand);

  return (
    <AppView style={styles.container}>
      <AppView style={styles.leftContainer}>
        <AppLogo />
        <AppName />
      </AppView>
      <AppView style={styles.rightContainer}>
        <AppAnimatedPressable
          style={styles.button}
          onPress={() => {
            expand("SAVED_UPI_APP_QR_CODE");
          }}
        >
          <Ionicons name="qr-code" size={26} color={theme.text.primary} />
        </AppAnimatedPressable>
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
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
