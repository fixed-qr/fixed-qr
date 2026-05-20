import { AppBottomSheet, AppText } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

export function PolicyBottomSheet() {
  const theme = useTheme();
  const ref = useBottomSheetStore((state) =>
    state.register("policy-bottom-sheet"),
  );

  return (
    <AppBottomSheet
      ref={ref}
      index={-1}
      enableDynamicSizing={true}
      enablePanDownToClose={true}
    >
      <BottomSheetView
        style={{
          backgroundColor: theme.background.secondary,
          paddingHorizontal: 20,
        }}
      >
        <AppText>Policy</AppText>
      </BottomSheetView>
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({});
