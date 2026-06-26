import { Header } from "@/components";
import {
  AppIcon,
  AppPressable,
  AppSafeAreaView,
  AppScrollView,
  AppText,
} from "@/components/app-ui";
import { QuickActionSection } from "@/components/sections";
import { useSheet } from "@/features/sheets/use-sheet";
import { useTheme } from "@/hooks/use-theme";
import { useUserStore } from "@/store/user-store";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const theme = useTheme();
  const name = useUserStore((state) => state.user?.name);
  const sheet = useSheet();

  return (
    <AppSafeAreaView>
      {/* Header */}
      <Header />

      {/* Content */}
      <AppScrollView>
        <AppText
          variant="bodyLarge"
          weight="600"
          color="secondary"
          style={styles.message}
        >
          👋 Hi, {name}!
        </AppText>

        {/* Generate QR Code Button */}
        <AppPressable
          onPress={() => {
            sheet.push("QrcodeSheet", {});
          }}
          style={({ pressed }) => [
            styles.GenQRCode,
            {
              borderColor: theme.border.primary,
              backgroundColor: pressed
                ? theme.accent.subtle
                : theme.accent.soft,
            },
          ]}
        >
          <AppIcon
            name="qr-code-outline"
            size={24}
            color={theme.text.primary}
          />
          <AppText variant="button" style={styles.GenQRCodeText}>
            New QR Code
          </AppText>
        </AppPressable>

        <QuickActionSection />
      </AppScrollView>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  message: {
    marginVertical: 12,
    marginLeft: 1,
    textTransform: "capitalize",
  },
  GenQRCode: {
    width: "100%",
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
