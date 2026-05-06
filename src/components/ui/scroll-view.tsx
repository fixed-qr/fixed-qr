import { bottomTabInset } from "@/constants/dimensions";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView as NativeScrollView, ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ScrollView(props: ScrollViewProps) {
  const { contentContainerStyle, style, ...rest } = props;

  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + bottomTabInset + spacing[16],
  };

  return (
    <NativeScrollView
      {...rest}
      style={[{ backgroundColor: theme.background }, style]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentInset={insets}
      keyboardDismissMode="interactive"
      contentContainerStyle={[
        {
          backgroundColor: theme.background,
          paddingHorizontal: spacing[20],
          justifyContent: "center",
          gap: spacing[8],
        },
        contentContainerStyle,
      ]}
    />
  );
}
