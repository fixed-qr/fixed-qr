import { Amount, AppLogo } from "@/components";
import { AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { User } from "@/types/user";
import { buildUpiPaymentUrl } from "@/utils/build-upi-payment-url";
import { forwardRef, RefObject } from "react";
import { StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";

const width = 164;
const borderRadius = 0;

interface Props {
  ref: RefObject<ViewShot | null>;
  user: User | null;
  upiId: string;
  amount?: string;
}

export const ShareQrcode = forwardRef<ViewShot, Omit<Props, "viewShotRef">>(
  ({ user, upiId, amount }, ref) => {
    const theme = useTheme();

    return (
      <AppView
        style={{
          flex: 1,
          alignItems: "center",
          position: "absolute",
          left: "200%",
          top: 0,
        }}
      >
        <ViewShot
          ref={ref}
          options={{
            format: "png",
            quality: 1,
          }}
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
              <AppLogo />
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

            {!!amount && (
              <Amount value={amount} currencySize={18} fontSize={24} />
            )}
          </AppView>
          <AppView
            style={[
              styles.footer,
              {
                backgroundColor: theme.accent.subtle,
              },
            ]}
          >
            <AppText variant="bodySmall" color="tertiary">
              Generated with FixedQR
            </AppText>
          </AppView>
        </ViewShot>
      </AppView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    width: 290,
    alignItems: "center",
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
});
