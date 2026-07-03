import { AppPressable, AppView } from "@/components/app-ui";
import { SCREEN_PADDING } from "@/constants/screen";
import { useSheet } from "@/features/sheets/use-sheet";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { AppLogo } from "./app-logo";
import { AppName } from "./app-name";

export function Header() {
  const theme = useTheme();
  const sheet = useSheet();

  return (
    <AppView style={styles.container}>
      <AppView style={styles.leftContainer}>
        <AppLogo />
        <AppName />
      </AppView>
      <AppView style={styles.rightContainer}>
        <AppPressable
          onPress={() => {
            sheet.push("SavedUpiQrcodeSheet", {});
          }}
          style={styles.button}
        >
          <Ionicons name="qr-code" size={26} color={theme.text.primary} />
        </AppPressable>
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: SCREEN_PADDING,
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
