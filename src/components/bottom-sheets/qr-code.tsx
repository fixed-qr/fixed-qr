import {
    AppBottomSheet,
    AppImage,
    AppText,
    AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

import { screenWidth } from "@/constants/dimensions";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { useDataStore } from "@/store/data-store";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { Link } from "expo-router";

const gap = 8;
const width = (screenWidth - gap * 3 - 40) / 3;

export function QRCodeBottomSheet() {
  const theme = useTheme();
  const upiIds = useDataStore((states) => states.upiIds);
  const ref = useBottomSheetStore((state) => state.register("qr-code-sheet"));

  return (
    <AppBottomSheet
      ref={ref}
      index={-1}
      enableDynamicSizing={true}
      enablePanDownToClose={true}
    >
      <BottomSheetView
        style={{
          backgroundColor: theme.background.secondary,
          paddingHorizontal: 20,
        }}
      >
        <AppView style={{ alignItems: "center", marginBottom: 16 }}>
          <AppText variant="headingSmall" weight="600">
            All QR Code
          </AppText>
        </AppView>
        {upiIds.length ? (
          <AppView style={styles.providerContainer}>
            {upiIds.map((upiId) => (
              <Link
                key={upiId.provider + upiId.upiId}
                href={{
                  pathname: "/(modals)/qr-code/result",
                  params: {
                    upiId: upiId.upiId,
                    provider: upiId.provider,
                  },
                }}
              >
                <AppView
                  style={[
                    styles.providerLink,
                    {
                      borderColor: theme.border.primary,
                      backgroundColor: theme.accent.soft,
                    },
                  ]}
                >
                  <AppView style={styles.providerLogoContainer}>
                    <AppImage
                      source={getProviderLogo(upiId.provider)}
                      style={styles.providerLogo}
                    />
                  </AppView>
                  <AppText
                    variant="bodySmall"
                    weight="500"
                    style={styles.providerLabel}
                  >
                    {upiId.label}
                  </AppText>
                </AppView>
              </Link>
            ))}
          </AppView>
        ) : (
          <AppView style={styles.upiIdNotFound}>
            <Link href={"/(tabs)/profile"}>
              <AppText
                style={[
                  styles.upiIdNotFoundLink,
                  { color: theme.accent.primary },
                ]}
              >
                You haven't added a UPI ID yet. Please add one to continue.
              </AppText>
            </Link>
          </AppView>
        )}
      </BottomSheetView>
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({
  error: {
    marginTop: 8,
    width: "90%",
  },
  authenticateButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: "100%",
    height: 48,
    padding: 8,
    borderRadius: 48,
    borderWidth: 1,
  },
  providerContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: gap,
  },
  providerLink: {
    width: width,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 8,
    paddingVertical: 16,
  },
  providerLogoContainer: {
    width: 24,
    height: 24,
    backgroundColor: "transparent",
  },
  providerLogo: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  providerLabel: {
    textAlign: "center",
  },
  upiIdNotFound: {
    width: "100%",
    minWidth: 0,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  upiIdNotFoundLink: {
    textAlign: "center",
    lineHeight: 22,
    flexShrink: 1,
  },
});
