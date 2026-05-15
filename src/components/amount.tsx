import { AppImage, AppText, AppView } from "@/components/app-ui";
import { ThemeColors } from "@/constants/theme-colors";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet } from "react-native";

const initialSize = 15.5;

interface AmountProps {
  amount: string;
  size?: number;
  color?: ThemeColors;
}

export function Amount({ amount, size, color }: AmountProps) {
  const theme = useTheme();

  return (
    <AppView style={styles.amount}>
      <AppImage
        source={require("@/assets/images/icons/rupee-64.png")}
        tintColor={theme.text.primary}
        style={[
          styles.unitImage,
          {
            width: size || initialSize,
            height: size || initialSize,
          },
        ]}
      />
      <AppText
        style={[
          styles.amountText,
          {
            fontSize: size ? size + 8 : initialSize + 8,
          },
        ]}
      >
        {amount}
      </AppText>
    </AppView>
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
    fontSize: initialSize + 8,
  },
});
