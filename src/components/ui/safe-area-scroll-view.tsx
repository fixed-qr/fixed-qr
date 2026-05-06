import { ScrollViewProps } from "react-native";
import { SafeAreaView, SafeAreaViewProps } from "./safe-area-view";
import { ScrollView } from "./scroll-view";

interface SafeAreaScrollViewProps {
  children?: React.ReactNode;
  safeAreaProps?: SafeAreaViewProps;
  scrollViewProps?: ScrollViewProps;
}

export function SafeAreaScrollView({
  children,
  safeAreaProps,
  scrollViewProps,
}: SafeAreaScrollViewProps) {
  return (
    <SafeAreaView {...safeAreaProps}>
      <ScrollView {...scrollViewProps}>{children}</ScrollView>
    </SafeAreaView>
  );
}
