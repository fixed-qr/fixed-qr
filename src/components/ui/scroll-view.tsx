import { spacing } from "@/constants/themex";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView as NativeScrollView, ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ScrollView(props: ScrollViewProps) {
  const { contentContainerStyle, style, ...rest } = props;

  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <NativeScrollView
      {...rest}
      style={[{ backgroundColor: theme.background.primary }, style]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentInset={safeAreaInsets}
      keyboardDismissMode="interactive"
      contentContainerStyle={[
        {
          backgroundColor: theme.background.primary,
          paddingHorizontal: spacing[20],
          justifyContent: "center",
          gap: spacing[8],
        },
        contentContainerStyle,
      ]}
    />
  );
}
