import { Amount, NumericKeypad } from "@/components";
import { AppPressable, AppText, AppView } from "@/components/app-ui";
import { SCREEN_PADDING, SCREEN_WIDTH } from "@/constants/screen";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useTheme } from "@/hooks/use-theme";
import { useSavedUpiAppStore } from "@/store/saved-upi-app-store";
import { mapRowState } from "@/utils/map-row-state";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useSheet } from "../../use-sheet";

const gap = 8;
const width = (SCREEN_WIDTH - gap * 3 - SCREEN_PADDING * 2) / 3;

export default function QrcodeSheet() {
  const theme = useTheme();
  const sheet = useSheet();
  const [value, setValue] = useState("");
  const savedUpiApps = useSavedUpiAppStore((states) => states.savedUpiApps);

  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        padding: SCREEN_PADDING,
        gap: gap,
      }}
    >
      <AppView
        style={[
          styles.amountInput,
          { backgroundColor: theme.background.secondary },
        ]}
      >
        <Amount value={value.length === 0 ? "0" : value} size={22} />
      </AppView>

      {/* Numeric Key Pad */}
      <NumericKeypad value={value} onChange={setValue} />

      {/* Providers */}
      {Object.keys(savedUpiApps).length ? (
        <AppView style={styles.upiAppContainer}>
          {mapRowState(
            Object.values(savedUpiApps),
            ({ item, columnIndex, isIncompleteRow }) => (
              <AppPressable
                key={item.upiId}
                onPress={() => {
                  if (!Number(value)) return;

                  sheet.push("QrcodeResultSheet", {
                    appName: item.appName,
                    upiId: item.upiId,
                    amount: value,
                  });
                }}
                style={({ pressed }) => [
                  styles.upiAppLink,
                  {
                    borderColor: theme.border.primary,
                    backgroundColor: pressed
                      ? theme.background.selected
                      : theme.background.tertiary,

                    flex: isIncompleteRow ? 1 : 0,
                  },
                ]}
              >
                <AppView style={{ alignItems: "center", gap: 4 }}>
                  <AppView style={styles.upiAppLogoContainer}>
                    <Image
                      source={upiAppLogo[item.appName]}
                      style={styles.upiAppLogo}
                      cachePolicy="memory-disk"
                    />
                  </AppView>
                  <AppText
                    variant="bodySmall"
                    weight="500"
                    style={styles.upiAppLabel}
                  >
                    {item.appName}
                  </AppText>
                </AppView>
              </AppPressable>
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
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  amountInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SCREEN_PADDING,
    marginTop: 8,
    marginBottom: 16,
  },
  rupeeUintImage: {
    height: 22,
    width: 22,
  },
  amount: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: 600,
  },
  upiAppContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: gap,
  },
  upiAppLink: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 8,
    borderRadius: 99,
  },
  upiAppLogoContainer: {
    width: 24,
    height: 24,
    backgroundColor: "transparent",
  },
  upiAppLogo: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  upiAppLabel: {
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
