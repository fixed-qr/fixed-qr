import { Header } from "@/components";
import { QuickActions } from "@/components/sections";
import {
    Ionicons,
    SafeAreaView,
    ScrollView,
    ThemedText,
    ThemedView,
} from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const theme = useTheme();
  const username = useDataStore((state) => state.user?.name);

  return (
    <SafeAreaView>
      <Header />
      <ScrollView>
        <ThemedText
          variant="headingSmall"
          color="secondary"
          style={styles.greetingMessageText}
        >
          Hi, {username}
        </ThemedText>
        <Link href={"/(modals)/qr-code"}>
          <ThemedView
            style={[
              styles.GenQRCode,
              {
                backgroundColor: theme.accent.soft,
                borderColor: theme.border.primary,
              },
            ]}
          >
            <Ionicons
              name="qr-code-outline"
              size={24}
              color={theme.text.primary}
            />
            <ThemedText variant="button" style={styles.GenQRCodeText}>
              Generate a QR Code
            </ThemedText>
          </ThemedView>
        </Link>
        <QuickActions />
      </ScrollView>
    </SafeAreaView>
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
