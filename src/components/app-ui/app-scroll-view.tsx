import { SCREEN_PADDING } from "@/constants/screen";
import { ScrollView, ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function AppScrollView({
  contentContainerStyle,
  style,
  ...rest
}: Readonly<ScrollViewProps>) {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScrollView
      {...rest}
      style={[{ backgroundColor: undefined, width: "100%" }, style]}
      contentInset={safeAreaInsets}
      contentContainerStyle={[
        {
          backgroundColor: undefined,
          paddingHorizontal: SCREEN_PADDING,
          gap: 8,
        },
        contentContainerStyle,
      ]}
    />
  );
}
