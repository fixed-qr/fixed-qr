import { Amount } from "@/components";
import { AppScrollView, AppText, AppView } from "@/components/app-ui";
import { screenWidth } from "@/constants/dimensions";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

const numericKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "⌫"];
const gap = 8;
const boxWidth = (screenWidth - gap * 3 - 40) / 3;

export default function QRCodeFormScreen() {
  const theme = useTheme();
  const [value, setValue] = useState("");
  const upiIds = useDataStore((states) => states.upiIds);

  const renderNumericKeyPad = () => {
    const handlePress = (num: any) => {
      if (value.length !== 0 || num !== "0") {
        setValue((prev) => prev + num);
      }
    };

    const handleDelete = () => {
      setValue((prev) => prev.slice(0, -1));
    };

    const pressableStyle = (key: string, pressed: boolean) => {
      let styles = {
        borderColor: theme.border.primary,
        backgroundColor: theme.accent.subtle,
        flex: 0,
      };

      if (pressed) {
        styles.backgroundColor = theme.accent.soft as any;
      } else {
        styles.backgroundColor = theme.accent.subtle;
      }

      if (key === "0") {
        styles.flex = 2;
      }

      return styles;
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
            <Pressable
              key={key}
              style={({ pressed }) => [
                styles.key,
                pressableStyle(key, pressed),
              ]}
              onPress={() => (key === "⌫" ? handleDelete() : handlePress(key))}
            >
              <AppText style={styles.keyText}>{key}</AppText>
            </Pressable>
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
      <AppView
        style={[
          styles.amountInput,
          { backgroundColor: theme.background.secondary },
        ]}
      >
        <Amount amount={value.length === 0 ? "0" : value} size={22} />
      </AppView>

      {/* Numeric Key Pad */}
      {renderNumericKeyPad()}

      {/* Providers */}
      {upiIds.length ? (
        <AppScrollView
          horizontal={true}
          style={styles.providerContainer}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 0,
            marginHorizontal: 0,
            backgroundColor: theme.background.secondary,
          }}
        >
          {upiIds.map((upiId) => (
            <Link
              key={upiId.provider + upiId.upiId}
              href={{
                pathname: "/(modals)/qr-code/result",
                params: {
                  amount: value,
                  upiId: upiId.upiId,
                  provider: upiId.provider,
                },
              }}
              disabled={!Number(value)}
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
                  <Image
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
        </AppScrollView>
      ) : (
        <AppView style={styles.upiIdNotFound}>
          <Link href={"/(modals)/add-upi"}>
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
    padding: 8,
    paddingHorizontal: 32,
    marginVertical: 16,
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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
  },
  providerLink: {
    width: boxWidth,
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
  numericPadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: gap,
  },
  key: {
    width: boxWidth,
    height: 60,
    borderRadius: 20,
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
