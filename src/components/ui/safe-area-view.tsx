import { screenWidth } from "@/constants/dimensions";
import { useTheme } from "@/hooks/use-theme";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import {
    SafeAreaView as NativeSafeAreaView,
    SafeAreaViewProps as NativeSafeAreaViewProps,
} from "react-native-safe-area-context";

export interface SafeAreaViewProps extends NativeSafeAreaViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
  backgroundColor?: string;
}

export function SafeAreaView({
  children,
  style,
  fullWidth = false,
  backgroundColor,
  ...props
}: SafeAreaViewProps) {
  const theme = useTheme();

  return (
    <NativeSafeAreaView
      {...props}
      style={[
        styles.safeAreaContainer,
        {
          backgroundColor: backgroundColor ?? theme.background,
          maxWidth: fullWidth ? undefined : screenWidth,
          alignSelf: fullWidth ? undefined : "center",
        },
        style,
      ]}
    >
      {children}
    </NativeSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    width: "100%",
  },
});
