import { StyleSheet, Text, type TextProps } from "react-native";

import { useTheme } from "@/hooks/use-theme";

const variants = {
  body: {
    fontSize: 16,
    lineHeight: 24,
  },

  small: {
    fontSize: 14,
    lineHeight: 20,
  },

  title: {
    fontSize: 48,
    lineHeight: 52,
  },

  subtitle: {
    fontSize: 32,
    lineHeight: 44,
  },

  link: {
    fontSize: 14,
    lineHeight: 30,
  },
} as const;

type Variant = keyof typeof variants;

type FontWeight = "400" | "500" | "600" | "700" | "800";

export type ThemedTextProps = TextProps & {
  variant?: Variant;
  weight?: FontWeight;
};

export function ThemedText({
  variant = "body",
  weight = "500",
  style,
  ...props
}: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      {...props}
      style={[
        styles.base,
        {
          color: theme.text.primary,
          fontWeight: weight,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
