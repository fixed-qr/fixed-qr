import { Amount } from "@/components";
import { AppScrollView, AppText, AppView } from "@/components/app-ui";
import { screenWidth } from "@/constants/dimensions";
import { useTheme } from "@/hooks/use-theme";
import { useUserDataStore } from "@/store/user-data-store";
import { ProviderEnum } from "@/types/provider";
import { AppDateTime } from "@/utils/app-date-time";
import { generateTransactionId } from "@/utils/generate-transaction-id";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { generateUpiUrl } from "@/utils/upi-payment";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const width = (screenWidth - 40) / 1.6;
const borderRadius = 24;

type LocalSearchParams = {
  upiId: string;
  amount: string;
  provider: ProviderEnum;
};

export default function GeneratedQRCodeScreen() {
  const theme = useTheme();
  const { upiId, amount, provider } = useLocalSearchParams<LocalSearchParams>();
  const addTransaction = useUserDataStore((state) => state.addTransaction);
  const user = useUserDataStore((state) => state.user);

  useEffect(() => {
    if (amount) {
      addTransaction({
        transactionId: generateTransactionId(),
        upiId: upiId,
        provider: provider,
        amount: amount,
        date: new AppDateTime().formatTo("iso"),
      });
    }
  }, []);

  return (
    <AppScrollView>
      <AppView
        style={[
          styles.container,
          { backgroundColor: theme.background.secondary },
        ]}
      >
        <AppView
          style={[
            styles.upiIdContainer,
            { backgroundColor: theme.background.secondary },
          ]}
        >
          <Image
            source={getProviderLogo(provider as any)}
            style={styles.image}
          />
          <AppText style={styles.message}>Scan to pay</AppText>
        </AppView>
        <AppView
          style={[
            styles.qrCodeContainer,
            {
              backgroundColor: theme.background.card,
              borderColor: theme.border.primary,
            },
          ]}
        >
          <QRCode
            value={generateUpiUrl(
              amount
                ? {
                    pa: upiId,
                    pn: user?.name as string,
                    am: amount,
                  }
                : {
                    pa: upiId,
                    pn: user?.name as string,
                  },
            )}
            color={theme.text.primary}
            backgroundColor="transparent"
            size={width - borderRadius}
          />
        </AppView>

        <AppText
          variant="bodySmall"
          weight="500"
          color="tertiary"
          style={{ marginBottom: 8 }}
        >
          UPI ID: {upiId}
        </AppText>
        {!!amount && <Amount value={amount} size={24} />}
      </AppView>
    </AppScrollView>
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
    gap: 8,
    marginBlock: 12,
    paddingBlock: 2.5,
    paddingInline: 12,
    borderRadius: 16,
  },
  image: {
    width: 32,
    height: 32,
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
    marginBottom: 16,
  },
});
