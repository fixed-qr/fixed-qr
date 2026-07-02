import { Amount, EmptyCard } from "@/components";
import {
  AppIcon,
  AppImage,
  AppPressable,
  AppText,
  AppView,
} from "@/components/app-ui";
import { SCREEN_PADDING, SCREEN_WIDTH } from "@/constants/screen";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useSheet } from "@/features/sheets/use-sheet";
import { useTheme } from "@/hooks/use-theme";
import { useSavedUpiAppStore } from "@/store/saved-upi-app-store";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useHistoryStore } from "../store";

const gap = 8;
const width = (SCREEN_WIDTH - gap - SCREEN_PADDING * 2) / 2;

export function Suggestion() {
  const theme = useTheme();
  const sheet = useSheet();

  const histories = useHistoryStore((state) => state.histories);
  const savedUpiApps = useSavedUpiAppStore((state) => state.savedUpiApps);

  const suggestions = useMemo(() => {
    const seen = new Set<string>();

    return histories.filter((history) => {
      const key = `${history.amount}-${history.appName}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);

      return true;
    });
  }, [histories]).slice(0, 4);

  return (
    <AppView>
      <AppText
        variant="bodyMedium"
        color="tertiary"
        weight="600"
        style={styles.quickSuggestionsTitle}
      >
        Suggestions
      </AppText>
      {suggestions.length ? (
        <AppView style={[styles.quickSuggestions]}>
          {suggestions.map((tsx) => (
            <AppPressable
              key={tsx.id}
              onPress={() => {
                sheet.push("QrcodeResultSheet", {
                  appName: tsx.appName,
                  upiId: savedUpiApps[tsx.appName]?.upiId as string,
                  amount: tsx.amount,
                });
              }}
              style={({ pressed }) => [
                styles.quickSuggestion,
                {
                  borderColor: theme.border.primary,
                  backgroundColor: pressed
                    ? theme.background.selected
                    : theme.background.card,
                  width: width,
                  height: width / 1.25,
                },
              ]}
            >
              <AppImage
                source={upiAppLogo[tsx.appName]}
                style={styles.logoImage}
              />
              <Amount value={tsx.amount} />
              <AppView style={styles.upiApp}>
                <AppText variant="bodyMedium" color="secondary">
                  {tsx.appName}
                </AppText>
                <AppIcon
                  name="arrow-forward"
                  size={16}
                  style={{ transform: "rotate(-45deg)" }}
                  color={theme.text.secondary}
                />
              </AppView>
            </AppPressable>
          ))}
        </AppView>
      ) : (
        <AppView
          style={{
            borderWidth: 1,
            borderColor: theme.border.primary,
            borderRadius: 24,
            marginTop: 8,
          }}
        >
          <EmptyCard message="Your quick actions will appear here." />
        </AppView>
      )}
    </AppView>
  );
}

const styles = StyleSheet.create({
  quickSuggestionsTitle: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  quickSuggestions: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
  },
  quickSuggestion: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 28,
  },
  logoImage: {
    width: 36,
    height: 36,
    marginBottom: 6,
  },
  upiApp: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
});
