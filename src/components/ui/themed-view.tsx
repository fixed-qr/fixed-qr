import { ThemeColors } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { PropsWithChildren } from "react";
import { View, type ViewProps } from "react-native";

type ThemedViewProps = PropsWithChildren<ViewProps> & {
  color?: ThemeColors;
};

export function ThemedView({ style, children, ...props }: ThemedViewProps) {
  const theme = useTheme();

  return (
    <View
      style={[{ backgroundColor: theme.background.primary }, style]}
      {...props}
    >
      {children}
    </View>
  );
}
