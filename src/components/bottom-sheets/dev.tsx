import { AppBottomSheet, AppText } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

export function DevBottomSheet() {
  const theme = useTheme();
  const ref = useBottomSheetStore((state) => state.register("dev-sheet"));

  return (
    <AppBottomSheet
      ref={ref}
      index={-1}
      enableDynamicSizing={true}
      enablePanDownToClose={true}
    >
      <BottomSheetScrollView
        style={{
          backgroundColor: theme.background.secondary,
          paddingHorizontal: 20,
        }}
      >
        <AppText>Developer Screen</AppText>
      </BottomSheetScrollView>
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({});
