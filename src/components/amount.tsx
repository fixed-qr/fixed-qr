import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet } from "react-native";
import { Image, ThemedText, ThemedView } from "./ui";

const initialSize = 15.5;

interface AmountProps {
  amount: string;
  size?: number;
  color?: ThemeColor;
}

export function Amount({ amount, size, color }: AmountProps) {
  const theme = useTheme();

  return (
    <ThemedView style={styles.amount}>
      <Image
        source={require("@/assets/images/icons/rupee-64.png")}
        tintColor={color || theme.text}
        style={[
          styles.unitImage,
          {
            width: size || initialSize,
            height: size || initialSize,
          },
        ]}
      />
      <ThemedText
        themeColor={color || "text"}
        style={[
          styles.amountText,
          {
            fontSize: size ? size + 6 : initialSize + 6,
          },
        ]}
      >
        {amount}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  amount: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
  },
  unitImage: {
    height: initialSize,
    width: initialSize,
  },
  amountText: {
    fontSize: initialSize + 6,
  },
});
