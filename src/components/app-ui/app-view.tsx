import { BackgroundToken } from "@/constants/theme-colors";
import { useTheme } from "@/hooks/use-theme";
import { PropsWithChildren } from "react";
import { View, type ViewProps } from "react-native";

type AppViewProps = PropsWithChildren<ViewProps> & {
  backgroundColor?: BackgroundToken;
};

export function AppView({
  style,
  children,
  backgroundColor,
  ...rest
}: AppViewProps) {
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
