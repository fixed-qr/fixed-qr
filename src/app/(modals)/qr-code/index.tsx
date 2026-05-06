import { ScrollView, ThemedText, ThemedView } from "@/components/ui";
import { screenWidth } from "@/constants/dimensions";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useStore } from "@/store/useStore";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";

const numericKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "⌫"];
const gap = spacing[8];
const boxWidth = (screenWidth - gap * 3 - 40) / 3;

export default function QRCodeFormScreen() {
  const theme = useTheme();
  const [value, setValue] = useState("");
  const upiIds = useStore((states) => states.upiIds);

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
        borderColor: theme.border,
        backgroundColor: theme.backgroundElement,
        flex: 0,
      };

      if (pressed) {
        styles.backgroundColor = theme.primarySoft as any;
      } else {
        styles.backgroundColor = theme.backgroundElement;
      }

      if (key === "0") {
        styles.flex = 2;
      }

      return styles;
    };

    return (
      <ThemedView style={styles.numericPadContainer}>
        {numericKeys.map((key) => {
          if (key === "") {
            return <ThemedView key={key} style={styles.key} />;
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
              <ThemedText style={styles.keyText}>{key}</ThemedText>
            </Pressable>
          );
        })}
      </ThemedView>
    );
  };

  return (
    <ScrollView>
      <ThemedView style={styles.amountInput}>
        <Image
          source={require("@/assets/images/icons/rupee-64.png")}
          style={[styles.rupeeUintImage, { tintColor: theme.primary }]}
        />
        <TextInput
          value={value}
          editable={false}
          showSoftInputOnFocus={false}
          placeholder="0"
          style={[styles.amount, { color: theme.primary }]}
          placeholderTextColor={theme.primary}
        />
      </ThemedView>
      {/* Providers */}

      <ScrollView
        horizontal={true}
        style={[
          styles.providerContainer,
          { backgroundColor: theme.background, borderColor: theme.border },
        ]}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 0,
          marginHorizontal: 0,
        }}
      >
        {upiIds.length ? (
          upiIds.map((upiId) => (
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
              <ThemedView
                style={[
                  styles.providerLink,
                  {
                    borderColor: theme.border,
                    backgroundColor: theme.primarySoft,
                  },
                ]}
              >
                <ThemedView style={styles.providerLogoContainer}>
                  <Image
                    source={getProviderLogo(upiId.provider)}
                    style={styles.providerLogo}
                  />
                </ThemedView>
                <ThemedText type="smallBold" style={styles.providerLabel}>
                  {upiId.label}
                </ThemedText>
              </ThemedView>
            </Link>
          ))
        ) : (
          <ThemedText>Upi not added</ThemedText>
        )}
      </ScrollView>
      {renderNumericKeyPad()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  amountInput: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    paddingInline: 32,
    marginBlock: 16,
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
    paddingVertical: gap,
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
});
