import { ScrollView, ThemedText } from "@/components/ui";
import { ThemedView } from "@/components/ui/themed-view";
import { screenWidth } from "@/constants/dimensions";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useLocalSearchParams } from "expo-router";
import { Image, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const width = (screenWidth - 40) / 1.5;
const borderRadius = 32;

export default function GeneratedQRCodeScreen() {
  const { amount, upiId } = useLocalSearchParams();
  const theme = useTheme();

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={[styles.upiIdContainer]}>
          <ThemedText style={styles.message}>Scan to pay</ThemedText>
          <ThemedText
            type="smallBold"
            style={[styles.message, { color: theme.textMuted }]}
          >
            {upiId}
          </ThemedText>
        </ThemedView>
        <ThemedView
          style={[
            styles.qrCodeContainer,
            {
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
            },
          ]}
        >
          <QRCode
            value={`upi://pay?pa=${upiId}&pn=Shailesh%Pandit&am=${amount}&cu=INR`}
            color={theme.text}
            backgroundColor="transparent"
            size={width - borderRadius}
          />
        </ThemedView>
        <ThemedView style={styles.amountContainer}>
          <Image
            source={require("@/assets/images/icons/rupee-64.png")}
            style={[styles.amountUnit, { tintColor: theme.primary }]}
          />
          <ThemedText style={[styles.amount, { color: theme.primary }]}>
            {amount}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  upiIdContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[8],
    marginBlock: 12,
    paddingBlock: 2.5,
    paddingInline: 12,
    borderRadius: 16,
  },
  message: {
    fontSize: 18,
    fontWeight: 600,
  },
  qrCodeContainer: {
    aspectRatio: 1,
    width: width,
    borderRadius: borderRadius,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qrCode: {},
  amountContainer: {
    flex: 1,
    flexWrap: "wrap",
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  amountUnit: {
    height: 22,
    width: 22,
  },
  amount: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: 600,
  },
  saveToHistory: {
    width: width,
    paddingBlock: 12,
    paddingInline: 16,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
    borderWidth: 1,
  },
});
