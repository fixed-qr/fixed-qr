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
  ...props
}: ThemedViewProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: backgroundColor
            ? theme["background"][backgroundColor]
            : "transparent",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
