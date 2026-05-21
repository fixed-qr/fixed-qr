import { Text, type TextProps } from "react-native";

import { TextVariant, textVariants } from "@/constants/text-variants";
import { BackgroundToken, TextToken } from "@/constants/theme-colors";
import { useTheme } from "@/hooks/use-theme";
import { FontWeight } from "@/types/font-weight";

export type AppTextProps = TextProps & {
  variant?: TextVariant;
  weight?: FontWeight;
  color?: TextToken;
  backgroundColor?: BackgroundToken;
};

export function AppText({
  variant,
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
          ...(variant && textVariants[variant]),
          ...(weight && {
            fontWeight: weight,
          }),
        },
        style,
      ]}
    />
  );
}
