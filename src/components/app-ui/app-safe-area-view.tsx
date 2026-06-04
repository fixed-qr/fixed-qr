import { screenWidth } from "@/constants/dimensions";
import { useTheme } from "@/hooks/use-theme";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

export interface AppSafeAreaViewProps extends SafeAreaViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
}

export function AppSafeAreaView({
  children,
  style,
  fullWidth = false,
  ...props
}: Readonly<AppSafeAreaViewProps>) {
  const theme = useTheme();

  return (
    <SafeAreaView
      {...props}
      style={[
        styles.safeAreaContainer,
        {
          backgroundColor: theme.background.primary,
          maxWidth: fullWidth ? undefined : screenWidth,
          alignSelf: fullWidth ? undefined : "center",
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    width: "100%",
  },
});
