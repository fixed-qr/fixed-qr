import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { Amount } from "./amount";
import { Image, Ionicons, ThemedText, ThemedView } from "./ui";

interface QuickActionProps {
  logoImage: ImageSourcePropType;
  label: string;
  amount: string;
  size: number;
}

export function QuickAction({
  logoImage,
  label,
  amount,
  size,
}: QuickActionProps) {
  const theme = useTheme();

  return (
    <ThemedView
      style={[
        styles.quickAction,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: theme.border,
          width: size,
          height: size / 1.25,
        },
      ]}
    >
      <Image source={logoImage} style={styles.logoImage} />
      <Amount amount={amount} />
      <ThemedView style={styles.provider}>
        <ThemedText
          type="small"
          themeColor="textSecondary"
          style={styles.providerText}
        >
          {label}
        </ThemedText>
        <Ionicons
          name="arrow-forward"
          size={16}
          style={{ transform: "rotate(-45deg)" }}
          color={theme.textSecondary}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  quickAction: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 28,
  },
  logoImage: {
    width: 36,
    height: 36,
    marginBottom: "auto",
  },
  provider: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  providerText: {},
});
