import { StyleSheet, Text, type TextProps } from "react-native";

import { TextVariant, textVariants } from "@/constants/text-variants";
import { BackgroundColors, TextColors } from "@/constants/theme-colors";
import { useTheme } from "@/hooks/use-theme";
import { FontWeight } from "@/types/font-weight";

export type ThemedTextProps = TextProps & {
  variant?: TextVariant;
  weight?: FontWeight;
  backgroundColor?: BackgroundColors;
  color?: TextColors;
};

export function ThemedText({
  variant,
  weight,
  backgroundColor,
  color,
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
          color: color ? theme.text[color] : theme.text.primary,
          backgroundColor: backgroundColor
            ? theme.background[backgroundColor]
            : "transparent",
          ...textVariants[variant || "body"],
          ...(weight && { fontWeight: weight }),
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
