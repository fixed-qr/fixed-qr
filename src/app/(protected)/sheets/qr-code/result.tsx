import { Amount } from "@/components";
import { AppText, AppView } from "@/components/app-ui";
import { screenWidth } from "@/constants/dimensions";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useTheme } from "@/hooks/use-theme";
import { useTransactionStore } from "@/store/transaction-store";
import { useUserStore } from "@/store/user-store";
import { QrCodeResultParams } from "@/types/qr-code-result-params";
import { Transaction } from "@/types/transaction";
import { buildUpiPaymentUrl } from "@/utils/build-upi-payment-url";
import { createTransactionId } from "@/utils/create-transaction-id";
import { DateTime } from "@/utils/date-time";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, usePathname } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

const width = (screenWidth - 40) / 1.6;
const borderRadius = 24;

export default function QrcodeResultSheet() {
  const theme = useTheme();
  const pathname = usePathname();
  const { upiId, amount, appName } = useLocalSearchParams<QrCodeResultParams>();
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!upiId || !amount || !appName) {
      return;
    }

    addTransaction({
      id: createTransactionId(),
      appName: appName,
      amount: amount,
      date: new DateTime().formatTo("iso"),
    } as Transaction);
  }, []);

  return (
    <BottomSheetScrollView
      key={pathname}
      contentContainerStyle={{
        padding: 20,
      }}
    >
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
          <Image source={upiAppLogo[appName]} style={styles.image} />
          <AppText style={styles.message}>Scan to pay</AppText>
        </AppView>
        <AppView
          style={[
            styles.qrCodeContainer,
            {
              backgroundColor: theme.background.tertiary,
              borderColor: theme.border.primary,
            },
          ]}
        >
          <QRCode
            value={buildUpiPaymentUrl(
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
          style={{ marginBottom: 2 }}
        >
          UPI ID
        </AppText>

        <AppText
          variant="bodySmall"
          weight="500"
          color="tertiary"
          style={{ marginBottom: 8 }}
        >
          {upiId}
        </AppText>
        {!!amount && <Amount value={amount} size={24} />}
      </AppView>
    </BottomSheetScrollView>
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
