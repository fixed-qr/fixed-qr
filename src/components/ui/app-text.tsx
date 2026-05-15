import { Text, type TextProps } from "react-native";

import { TextVariant, textVariants } from "@/constants/text-variants";
import { BackgroundColors, TextColors } from "@/constants/theme-colors";
import { useTheme } from "@/hooks/use-theme";
import { FontWeight } from "@/types/font-weight";

export type AppTextProps = TextProps & {
  variant?: TextVariant;
  weight?: FontWeight;
  color?: TextColors;
  backgroundColor?: BackgroundColors;
};

export function AppText({
  variant = "bodyMedium",
  weight,
  color,
  backgroundColor,
  style,
  ...props
}: AppTextProps) {
  const theme = useTheme();

  return (
    <Text
      {...props}
      style={[
        {
          includeFontPadding: false,
          color: color ? theme.text[color] : theme.text.primary,
          backgroundColor: backgroundColor
            ? theme.background[backgroundColor]
            : undefined,
          ...textVariants[variant],
          ...(weight && {
            fontWeight: weight,
          }),
        },
        style,
      ]}
    />
  );
}
