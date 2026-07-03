import { AlertModal } from "@/components";
import { AppIcon, AppImage, AppText, AppView } from "@/components/app-ui";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useHistoryStore } from "@/features/history/store";
import { useTheme } from "@/hooks/use-theme";
import { UpiApp } from "@/types/upi-app";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useUpiAppStore } from "../store";

interface Props {
  upiApp: UpiApp;
  isLast: boolean;
}

export function SavedUpiAppCard({ upiApp, isLast }: Readonly<Props>) {
  const theme = useTheme();

  const [showAlert, setShowAlert] = useState(false);

  const removeUpiApp = useUpiAppStore((state) => state.removeUpiApp);
  const clearHistoriesForApp = useHistoryStore(
    (state) => state.clearHistoriesForApp,
  );

  return (
    <>
      <AppView
        style={[
          styles.upiId,
          {
            borderColor: theme.border.primary,
            borderBottomWidth: isLast ? 0 : 1,
          },
        ]}
      >
        <AppView style={styles.left}>
          <AppImage
            source={upiAppLogo[upiApp.appName]}
            style={styles.logoImage}
          />
          <AppView style={styles.upiIdInfo}>
            <AppText variant="button">{upiApp.appName}</AppText>
            <AppText variant="bodySmall" color="tertiary">
              {upiApp.upiId}
            </AppText>
          </AppView>
        </AppView>
        <AppView style={styles.right}>
          <Pressable
            onPress={() => {
              setShowAlert(true);
            }}
          >
            <AppIcon name="close" size={18} color={theme.text.primary} />
          </Pressable>
        </AppView>
      </AppView>

      {/* Delete confirmation */}
      <AlertModal
        visible={showAlert}
        title="Remove UPI ID"
        message={`Are you sure you want to remove this UPI ID (${upiApp.appName})?`}
        onCancel={() => setShowAlert(false)}
        onConfirm={() => {
          removeUpiApp(upiApp.appName);
          clearHistoriesForApp(upiApp.appName);
          setShowAlert(false);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  upiId: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  right: {},
  logoImage: {
    width: 24,
    height: 24,
  },
  upiIdInfo: {
    gap: 2,
  },
});
