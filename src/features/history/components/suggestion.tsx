import { Amount, EmptyCard, Section } from "@/components";
import {
  AppIcon,
  AppImage,
  AppPressable,
  AppText,
  AppView,
} from "@/components/app-ui";
import { SCREEN_PADDING, SCREEN_WIDTH } from "@/constants/screen";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useUpiAppStore } from "@/features/upi-app/store";
import { useTheme } from "@/hooks/use-theme";
import { useSheet } from "@/sheets/use-sheet";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useHistoryStore } from "../store";

const GAP = 8;
const WIDTH = (SCREEN_WIDTH - GAP - SCREEN_PADDING * 2) / 2;

export function Suggestion() {
  const theme = useTheme();
  const sheet = useSheet();

  const histories = useHistoryStore((state) => state.histories);
  const upiApps = useUpiAppStore((state) => state.upiApps);

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
    <Section title="Suggestions">
      {suggestions.length ? (
        <AppView style={[styles.suggestions]}>
          {suggestions.map((tsx) => (
            <AppPressable
              key={tsx.id}
              onPress={() => {
                sheet.push("QrcodeResultSheet", {
                  appName: tsx.appName,
                  upiId: upiApps[tsx.appName]?.upiId as string,
                  amount: tsx.amount,
                });
              }}
              style={({ pressed }) => [
                styles.suggestion,
                {
                  width: WIDTH,
                  borderColor: theme.border.primary,
                  backgroundColor: theme.background.cardMuted,
                },
              ]}
            >
              <AppImage
                source={upiAppLogo[tsx.appName]}
                style={styles.logoImage}
              />
              <Amount value={tsx.amount} currencySize={15} fontSize={20} />

              {/* UPI app name */}
              <AppView style={styles.upiApp}>
                <AppText variant="bodySmall" color="tertiary">
                  {tsx.appName}
                </AppText>
                <AppIcon
                  name="arrow-forward"
                  size={16}
                  style={{ transform: "rotate(-45deg)" }}
                  color={theme.text.tertiary}
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
          }}
        >
          <EmptyCard message="Your recent suggestions will appear here." />
        </AppView>
      )}
    </Section>
  );
}

const styles = StyleSheet.create({
  suggestions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: GAP,
  },
  suggestion: {
    gap: 4,
    padding: 16,
    borderWidth: 1,
    borderRadius: 26,
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  upiApp: {
    gap: 2,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
});
