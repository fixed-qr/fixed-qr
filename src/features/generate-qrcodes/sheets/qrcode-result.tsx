import { Amount } from "@/components";
import {
  AppIcon,
  AppImage,
  AppPressable,
  AppText,
  AppView,
} from "@/components/app-ui";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useHistoryStore } from "@/features/history/store";
import { useUserStore } from "@/features/user/store";
import { useTheme } from "@/hooks/use-theme";
import { UpiAppName } from "@/types/upi-app-name";
import { buildUpiPaymentUrl } from "@/utils/build-upi-payment-url";
import { createTransactionId } from "@/utils/create-transaction-id";
import { DateTime } from "@/utils/date-time";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as Sharing from "expo-sharing";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { ShareQrcode } from "../components";

const width = 164;
const borderRadius = 0;

interface Props {
  appName: UpiAppName;
  upiId: string;
  amount?: string;
}

export function QrcodeResultSheet({ appName, upiId, amount }: Readonly<Props>) {
  const theme = useTheme();

  const viewShotRef = useRef<ViewShot | null>(null);

  const addHistory = useHistoryStore((state) => state.addHistory);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!upiId || !amount || !appName) {
      return;
    }

    addHistory({
      id: createTransactionId(),
      appName: appName,
      amount: amount,
      date: new DateTime().formatTo("iso"),
    });
  }, []);

  const captureQR = async () => {
    if (!viewShotRef.current) return;

    const uri = await viewShotRef.current?.capture?.();

    return uri;
  };

  const shareQR = async () => {
    const imageUri = await captureQR();

    if (!imageUri) return;

    await Sharing.shareAsync(imageUri);
  };

  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        padding: 20,
        paddingTop: 0,
        position: "relative",
      }}
    >
      <ShareQrcode
        ref={viewShotRef}
        user={user}
        upiId={upiId}
        amount={amount}
      />

      <AppView
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <AppView
          style={[
            styles.container,
            { backgroundColor: theme.background.secondary },
          ]}
        >
          <AppView style={styles.contentContainer}>
            <AppView
              style={[
                styles.upiIdContainer,
                { backgroundColor: theme.background.secondary },
              ]}
            >
              <AppImage source={upiAppLogo[appName]} style={styles.image} />
              <AppText style={styles.message}>Scan & pay</AppText>
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

            {!!amount && <Amount value={amount} size={24} />}
          </AppView>

          {/* Share Button */}
          <AppView style={styles.shareContainer}>
            <AppPressable
              onPress={shareQR}
              style={[
                styles.shareButton,
                {
                  backgroundColor: theme.accent.subtle,
                  borderColor: theme.border.primary,
                },
              ]}
            >
              <AppIcon
                name="share-social"
                size={24}
                color={theme.text.primary}
              />
            </AppPressable>
          </AppView>
        </AppView>
      </AppView>
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    alignItems: "center",
    width: "90%",
    maxWidth: 290,
    overflow: "hidden",
  },

  contentContainer: {
    flex: 1,
    gap: 12,
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
  },

  upiIdContainer: {
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
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
  },

  footer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
  },

  shareContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  shareButton: {
    aspectRatio: 1,
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 48,
    borderWidth: 1,
  },
});
