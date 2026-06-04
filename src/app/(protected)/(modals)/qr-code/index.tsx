import { Amount } from "@/components";
import {
  AppAnimatedPressable,
  AppScrollView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { screenWidth } from "@/constants/dimensions";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useTheme } from "@/hooks/use-theme";
import { useSavedUpiAppStore } from "@/store/saved-upi-app-store";
import { QrCodeResultParams } from "@/types/qr-code-result-params";
import { mapRowState } from "@/utils/map-row-state";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

const numericKeys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
  "0",
  "⌫",
];
const gap = 8;
const width = (screenWidth - gap * 3 - 40) / 3;

export default function QrCodeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [value, setValue] = useState("");
  const savedUpiApps = useSavedUpiAppStore((states) => states.savedUpiApps);

  const renderNumericKeyPad = () => {
    const handlePress = (num: any) => {
      if (value.length !== 0 || num !== "0") {
        setValue((prev) => prev + num);
      }
    };

    const handleDelete = () => {
      setValue((prev) => prev.slice(0, -1));
    };

    return (
      <AppView
        style={[
          styles.numericPadContainer,
          { backgroundColor: theme.background.secondary },
        ]}
      >
        {numericKeys.map((key) => {
          if (key === "") {
            return <AppView key={key} style={styles.key} />;
          }

          return (
            <AppAnimatedPressable
              key={key}
              style={({ pressed }) => [
                styles.key,
                {
                  borderColor: pressed
                    ? theme.border.focus
                    : theme.border.primary,
                  backgroundColor: pressed
                    ? theme.background.selected
                    : theme.background.tertiary,
                },
              ]}
              onPress={() => (key === "⌫" ? handleDelete() : handlePress(key))}
            >
              <AppText
                style={[styles.keyText, { fontSize: key === "⌫" ? 18 : 28 }]}
              >
                {key}
              </AppText>
            </AppAnimatedPressable>
          );
        })}
      </AppView>
    );
  };

  return (
    <AppScrollView
      style={{
        backgroundColor: theme.background.secondary,
      }}
      contentContainerStyle={{
        backgroundColor: theme.background.secondary,
      }}
    >
      <AppView style={{ alignItems: "center", marginBottom: 16 }}>
        <AppText variant="headingSmall" weight="600">
          Create QR Code
        </AppText>
      </AppView>
      <AppView
        style={[
          styles.amountInput,
          { backgroundColor: theme.background.secondary },
        ]}
      >
        <Amount value={value.length === 0 ? "0" : value} size={22} />
      </AppView>

      {/* Numeric Key Pad */}
      {renderNumericKeyPad()}

      {/* Providers */}
      {Object.keys(savedUpiApps).length ? (
        <AppView style={styles.providerContainer}>
          {mapRowState(
            Object.values(savedUpiApps),
            ({ item, columnIndex, isIncompleteRow }) => (
              <Pressable
                key={item.upiId}
                onPress={() => {
                  if (!Number(value)) return;

                  router.push({
                    pathname: "/(protected)/(modals)/qr-code/result",
                    params: {
                      amount: value,
                      upiId: item.upiId,
                      appName: item.appName,
                    } as QrCodeResultParams,
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
                    <Image
                      source={upiAppLogo[item.appName]}
                      style={styles.providerLogo}
                      cachePolicy="memory-disk"
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
    </AppScrollView>
  );
}

const styles = StyleSheet.create({
  amountInput: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 8,
    marginBottom: 28,
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
  numericPadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: gap,
  },
  key: {
    width: width,
    height: 60,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  keyText: {
    fontSize: 28,
    fontWeight: "600",
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
