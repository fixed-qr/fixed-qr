import { AppImage, AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import React from "react";
import { StyleSheet } from "react-native";

const initialSize = 15.5;

interface AmountProps {
  amount: string;
  size?: number;
}

export function Amount({ amount, size }: AmountProps) {
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
        style={{
          fontSize: size ? size + 8 : initialSize + 8,
        }}
      >
        {amount}
      </AppText>
    </AppView>
  );
}

const styles = StyleSheet.create({
  amount: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitImage: {
    height: initialSize,
    width: initialSize,
  },
});
