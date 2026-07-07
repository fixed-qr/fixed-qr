import { SCREEN_PADDING } from "@/constants/screen";
import { BackgroundToken } from "@/constants/theme-colors";
import { useTheme } from "@/hooks/use-theme";
import { PropsWithChildren, useMemo } from "react";
import { View, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AppViewProps = PropsWithChildren<ViewProps> & {
  backgroundColor?: BackgroundToken;
};

export function AppScreenView({
  style,
  children,
  backgroundColor,
  ...rest
}: AppViewProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const preStyles = useMemo(() => {
    const bgColor = backgroundColor
      ? theme.background[backgroundColor]
      : theme.background.primary;

    return {
      backgroundColor: bgColor,
      flex: 1,
      flexDirection: "column" as const,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingHorizontal: SCREEN_PADDING,
    };
  }, [theme, insets]);

  return (
    <View {...rest} style={[preStyles, style]}>
      {children}
    </View>
  );
}
