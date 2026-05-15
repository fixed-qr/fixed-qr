import { ScrollView, ScrollViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function AppScrollView({
  contentContainerStyle,
  style,
  ...rest
}: ScrollViewProps) {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScrollView
      {...rest}
      style={[{ backgroundColor: undefined }, style]}
      contentInset={safeAreaInsets}
      contentContainerStyle={[
        {
          backgroundColor: undefined,
          paddingHorizontal: 20,
          justifyContent: "center",
          gap: 8,
        },
        contentContainerStyle,
      ]}
    />
  );
}
