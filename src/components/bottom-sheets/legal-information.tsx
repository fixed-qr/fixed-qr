import { AppBottomSheet, AppText, AppView } from "@/components/app-ui";
import { SCREEN_PADDING } from "@/constants/screen";
import { useTheme } from "@/hooks/use-theme";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { useLegalInformationStore } from "@/store/legal-information-store";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet/src";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import Markdown from "react-native-markdown-display";

export function LegalInformationBottomSheet() {
  const theme = useTheme();
  const ref = useBottomSheetStore((state) =>
    state.register("LEGAL_INFORMATION"),
  );
  const { legalInformation, loading, fetchLegalInformation } =
    useLegalInformationStore();

  useEffect(() => {
    fetchLegalInformation();
  }, []);

  return (
    <AppBottomSheet
      ref={ref}
      index={-1}
      enableDynamicSizing={false}
      enablePanDownToClose={true}
      snapPoints={["60%"]}
    >
      <BottomSheetScrollView
        style={{
          backgroundColor: theme.background.secondary,
        }}
        contentContainerStyle={{
          paddingHorizontal: SCREEN_PADDING,
          paddingBottom: 8,
        }}
      >
        <AppView style={{ alignItems: "center", marginBottom: 16 }}>
          <AppText variant="headingSmall" weight="600">
            Terms & Privacy
          </AppText>
        </AppView>
        {!loading && legalInformation ? (
          <Markdown
            style={{
              body: {
                backgroundColor: theme.background.secondary,
                color: theme.text.primary,
                borderColor: theme.border.primary,
              },
            }}
          >
            {legalInformation}
          </Markdown>
        ) : (
          <ActivityIndicator size={24} color={theme.text.primary} />
        )}
      </BottomSheetScrollView>
    </AppBottomSheet>
  );
}
