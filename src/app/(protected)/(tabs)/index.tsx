import { Header } from "@/components";
import {
  AppIcon,
  AppPressable,
  AppScreenView,
  AppScrollView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { Suggestion } from "@/features/history/components/suggestion";
import { useUserStore } from "@/features/user/store";
import { useTheme } from "@/hooks/use-theme";
import { useSheet } from "@/sheets/use-sheet";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const theme = useTheme();
  const name = useUserStore((state) => state.user?.name);
  const sheet = useSheet();

  return (
    <AppScreenView>
      {/* Header */}
      <Header />

      <AppScrollView contentContainerStyle={{ gap: 8 }}>
        {/* Content */}

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
            styles.genQrCode,
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
          <AppText variant="button" style={styles.genQrCodeText}>
            New QR Code
          </AppText>
        </AppPressable>

        {/* Suggestion */}
        <AppView style={{ marginTop: 16 }}>
          <Suggestion />
        </AppView>
      </AppScrollView>
    </AppScreenView>
  );
}

const styles = StyleSheet.create({
  message: {
    marginVertical: 12,
    marginLeft: 1,
    textTransform: "capitalize",
  },
  genQrCode: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 68,
    borderWidth: 1,
  },
  genQrCodeText: {
    textAlign: "center",
  },
});
