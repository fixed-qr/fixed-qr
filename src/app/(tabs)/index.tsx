import { Header, RecentSection } from "@/components";
import {
  Ionicons,
  SafeAreaView,
  ScrollView,
  ThemedText,
  ThemedView,
} from "@/components/ui";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useStore } from "@/store/useStore";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
  const theme = useTheme();
  const username = useStore((state) => state.user?.username);

  return (
    <SafeAreaView>
      <ScrollView>
        <Header />
        <ThemedText
          style={[styles.greetingMessageText, { color: theme.textSecondary }]}
        >
          Hi, {username}
        </ThemedText>
        <Link href={"/(modals)/qr-code"}>
          <ThemedView
            style={[
              styles.GenQRCode,
              { backgroundColor: theme.primarySoft, borderColor: theme.border },
            ]}
          >
            <Ionicons name="qr-code-outline" size={24} color={theme.text} />
            <ThemedText type="default" style={styles.GenQRCodeText}>
              Generate a QR Code
            </ThemedText>
          </ThemedView>
        </Link>
        <RecentSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  greetingMessageText: {
    marginBlock: spacing[16],
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
    gap: spacing[8],
    borderRadius: 68,
    borderWidth: 1,
  },
  GenQRCodeText: {
    textAlign: "center",
  },
});
