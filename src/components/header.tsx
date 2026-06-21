import { AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { AppLogo } from "./app-logo";
import { AppName } from "./app-name";

export function Header() {
  const theme = useTheme();

  return (
    <AppView style={styles.container}>
      <AppView style={styles.leftContainer}>
        <AppLogo />
        <AppName />
      </AppView>
      <AppView style={styles.rightContainer}>
        <Link
          href={"/(protected)/sheets/saved-upi-app-qrcode"}
          style={styles.button}
        >
          <Ionicons name="qr-code" size={26} color={theme.text.primary} />
        </Link>
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
