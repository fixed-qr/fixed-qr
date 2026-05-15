import { BackgroundColors } from "@/constants/theme-colors";
import { useTheme } from "@/hooks/use-theme";
import { PropsWithChildren } from "react";
import { View, type ViewProps } from "react-native";

type ThemedViewProps = PropsWithChildren<ViewProps> & {
  backgroundColor?: BackgroundColors;
};

export function ThemedView({
  style,
  children,
  backgroundColor,
  ...rest
}: ThemedViewProps) {
  const theme = useTheme();

  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: backgroundColor
            ? theme.background[backgroundColor]
            : undefined,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
