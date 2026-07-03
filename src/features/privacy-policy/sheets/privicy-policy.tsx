import { AppSafeAreaView, AppText, AppView } from "@/components/app-ui";
import { SCREEN_PADDING } from "@/constants/screen";
import { useTheme } from "@/hooks/use-theme";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet/src";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import Markdown from "react-native-markdown-display";
import { useShallow } from "zustand/react/shallow";
import { usePrivacyPolicyStore } from "../store";

export function PrivacyPolicySheet() {
  const theme = useTheme();

  const { fetchPrivacyPolicy, privacyPolicy, isLoading, error } =
    usePrivacyPolicyStore(useShallow((state) => state));

  useEffect(() => {
    if (!privacyPolicy && !isLoading && !error) {
      fetchPrivacyPolicy();
    }
  }, []);

  if (isLoading) {
    return (
      <AppSafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator color={theme.text.primary} size={24} />
      </AppSafeAreaView>
    );
  }

  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        padding: SCREEN_PADDING,
        paddingBottom: 8,
      }}
    >
      <AppView style={{ alignItems: "center", marginBottom: 8 }}>
        <AppText variant="headingSmall" weight="600">
          Terms & Privacy
        </AppText>
      </AppView>
      {!isLoading && privacyPolicy ? (
        <Markdown
          style={{
            body: {
              backgroundColor: theme.background.secondary,
              color: theme.text.primary,
              borderColor: theme.border.primary,
            },
          }}
        >
          {privacyPolicy}
        </Markdown>
      ) : (
        <ActivityIndicator size={24} color={theme.text.primary} />
      )}
    </BottomSheetScrollView>
  );
}
