import { ScrollView, ThemedText } from "@/components/ui";
import { ThemedView } from "@/components/ui/themed-view";
import { screenWidth } from "@/constants/dimensions";
import { spacing } from "@/constants/themex";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { ProviderEnum } from "@/types/provider";
import { generateTransactionId } from "@/utils/generate-transaction-id";
import { getLocalDateTime } from "@/utils/get-local-date-time";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const width = (screenWidth - 40) / 1.5;
const borderRadius = 32;

type LocalSearchParams = {
  upiId: string;
  amount: string;
  provider: ProviderEnum;
};

export default function GeneratedQRCodeScreen() {
  const theme = useTheme();
  const { upiId, amount, provider } = useLocalSearchParams<LocalSearchParams>();
  const addTransaction = useDataStore((state) => state.addTransaction);

  useEffect(() => {
    const timer = setTimeout(() => {
      addTransaction({
        transactionId: generateTransactionId(),
        upiId: upiId,
        provider: provider,
        amount: amount,
        date: getLocalDateTime(),
      });
    }, 1000 * 5);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={[styles.upiIdContainer]}>
          <Image
            source={getProviderLogo(provider as any)}
            style={styles.image}
          />
          <ThemedText style={styles.message}>Scan to pay</ThemedText>
          <ThemedText
            variant="small"
            weight="500"
            style={[styles.message, { color: theme.text.muted }]}
          >
            {upiId}
          </ThemedText>
        </ThemedView>
        <ThemedView
          style={[
            styles.qrCodeContainer,
            {
              backgroundColor: theme.background.secondary,
              borderColor: theme.border.primary,
            },
          ]}
        >
          <QRCode
            value={`upi://pay?pa=${upiId}&pn=Shailesh%Pandit&am=${amount}&cu=INR`}
            color={theme.text.primary}
            backgroundColor="transparent"
            size={width - borderRadius}
          />
        </ThemedView>
        <ThemedView style={styles.amountContainer}>
          <Image
            source={require("@/assets/images/icons/rupee-64.png")}
            style={[styles.amountUnit, { tintColor: theme.accent.primary }]}
          />
          <ThemedText style={[styles.amount, { color: theme.accent.primary }]}>
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
  image: {
    width: 48,
    height: 48,
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
