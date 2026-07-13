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

const gap = 8;
const width = (SCREEN_WIDTH - gap - SCREEN_PADDING * 2) / 2;

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
    gap: gap,
  },
  suggestion: {
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
