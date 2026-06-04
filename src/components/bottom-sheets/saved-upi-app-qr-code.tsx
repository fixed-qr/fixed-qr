import {
  AppBottomSheet,
  AppImage,
  AppText,
  AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Pressable, StyleSheet } from "react-native";

import { screenWidth } from "@/constants/dimensions";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { useSavedUpiAppStore } from "@/store/saved-upi-app-store";
import { mapRowState } from "@/utils/map-row-state";
import { Link, useRouter } from "expo-router";

const gap = 8;
const width = (screenWidth - gap * 3 - 40) / 3;

export function SavedUpiAppQrCodeBottomSheet() {
  const theme = useTheme();
  const router = useRouter();
  const savedUpiApps = useSavedUpiAppStore((state) => state.savedUpiApps);
  const ref = useBottomSheetStore((state) =>
    state.register("qr-code-bottom-sheet"),
  );

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
        {Object.keys(savedUpiApps).length ? (
          <AppView style={styles.providerContainer}>
            {mapRowState(
              Object.values(savedUpiApps),
              ({ item, columnIndex, isIncompleteRow }) => (
                <Pressable
                  key={item.upiId}
                  onPress={() => {
                    router.push({
                      pathname: "/(protected)/(modals)/qr-code/result",
                      params: {
                        upiId: item.upiId,
                        appName: item.appName,
                      },
                    });
                  }}
                  style={({ pressed }) => [
                    styles.providerLink,
                    {
                      borderColor: pressed
                        ? theme.border.focus
                        : theme.border.primary,
                      backgroundColor: pressed
                        ? theme.background.selected
                        : theme.background.tertiary,

                      flex: isIncompleteRow ? 1 : 0,
                    },
                  ]}
                >
                  <AppView style={{ alignItems: "center", gap: 4 }}>
                    <AppView style={styles.providerLogoContainer}>
                      <AppImage
                        source={upiAppLogo[item.appName]}
                        style={styles.providerLogo}
                      />
                    </AppView>
                    <AppText
                      variant="bodySmall"
                      weight="500"
                      style={styles.providerLabel}
                    >
                      {item.appName}
                    </AppText>
                  </AppView>
                </Pressable>
              ),
              3,
            )}
          </AppView>
        ) : (
          <AppView style={styles.upiIdNotFound}>
            <Link href={"/(protected)/(tabs)/profile"}>
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
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 8,
    borderRadius: 99,
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
function useUpiAppStore(arg0: (states: any) => any) {
  throw new Error("Function not implemented.");
}
