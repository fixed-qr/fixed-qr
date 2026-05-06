import { bottomTabInset } from "@/constants/dimensions";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView as NativeScrollView, ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ScrollView(props: ScrollViewProps) {
  const theme = useTheme();
  const safeAreaInsets = useSafeAreaInsets();

  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + bottomTabInset + spacing[16],
  };

  return (
    <NativeScrollView
      style={{ backgroundColor: theme.background }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentInset={insets}
      keyboardDismissMode={"interactive"}
      {...props}
      contentContainerStyle={{
        backgroundColor: theme.background,
        paddingInline: spacing[20],
        justifyContent: "center",
        gap: spacing[8],
        ...props.contentContainerStyle,
      }}
    />
  );
}
