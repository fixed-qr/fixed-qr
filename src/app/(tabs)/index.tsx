import { Header } from "@/components";
import {
    AppIcon,
    AppSafeAreaView,
    AppScrollView,
    AppText,
    AppView,
} from "@/components/app-ui";
import {
    DevInfoBottomSheet,
    QRCodeBottomSheet,
} from "@/components/bottom-sheets";
import { QuickActionSection } from "@/components/sections";
import { useTheme } from "@/hooks/use-theme";
import { useUserDataStore } from "@/store/user-data-store";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const theme = useTheme();
  const username = useUserDataStore((state) => state.user?.name);

  return (
    <AppSafeAreaView>
      <Header />
      <AppScrollView>
        <AppText
          variant="bodyLarge"
          weight="600"
          color="secondary"
          style={styles.greetingMessageText}
        >
          Hi, {username}
        </AppText>
        <Link href={"/(modals)/qr-code"}>
          <AppView
            style={[
              styles.GenQRCode,
              {
                backgroundColor: theme.accent.soft,
                borderColor: theme.border.primary,
              },
            ]}
          >
            <AppIcon
              name="qr-code-outline"
              size={24}
              color={theme.text.primary}
            />
            <AppText variant="button" style={styles.GenQRCodeText}>
              Generate a QR Code
            </AppText>
          </AppView>
        </Link>
        <QuickActionSection />
      </AppScrollView>
      <QRCodeBottomSheet />
      <DevInfoBottomSheet />
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  greetingMessageText: {
    marginBlock: 16,
    marginLeft: 1,
    textTransform: "capitalize",
  },
  GenQRCode: {
    width: "100%",
    height: 68,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 68,
    borderWidth: 1,
  },
  GenQRCodeText: {
    textAlign: "center",
  },
});
