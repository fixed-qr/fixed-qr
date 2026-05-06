import { ThemeColor } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { PropsWithChildren } from "react";
import { View, type ViewProps } from "react-native";

type ThemedViewProps = PropsWithChildren<ViewProps> & {
  color?: ThemeColor;
};

export function ThemedView({
  style,
  color = "background",
  children,
  ...props
}: ThemedViewProps) {
  const theme = useTheme();

  return (
    <View style={[{ backgroundColor: theme[color] }, style]} {...props}>
      {children}
    </View>
  );
}
