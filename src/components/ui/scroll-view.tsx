import { ScrollView as NativeScrollView, ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ScrollView(props: ScrollViewProps) {
  const { contentContainerStyle, style, ...rest } = props;
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <NativeScrollView
      {...rest}
      style={[{ backgroundColor: "transparent" }, style]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentInset={safeAreaInsets}
      contentContainerStyle={[
        {
          backgroundColor: "transparent",
          paddingHorizontal: 20,
          justifyContent: "center",
          gap: 8,
        },
        contentContainerStyle,
      ]}
    />
  );
}
