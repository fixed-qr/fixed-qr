import { Amount, EmptyCard } from "@/components";
import { AppIcon, AppImage, AppText, AppView } from "@/components/app-ui";
import { SCREEN_PADDING } from "@/constants/screen";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useTheme } from "@/hooks/use-theme";
import { DateTime } from "@/utils/date-time";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { useHistoryStore } from "../store";

export function HistorySheet() {
  const theme = useTheme();
  const histories = useHistoryStore((state) => state.histories);

  return (
    <BottomSheetScrollView
      style={{
        backgroundColor: theme.background.secondary,
      }}
      contentContainerStyle={{ padding: SCREEN_PADDING }}
    >
      <AppView style={{ alignItems: "center", marginBottom: 16 }}>
        <AppText variant="headingSmall" weight="600">
          History
        </AppText>
      </AppView>
      {histories.length ? (
        <AppView
          style={[
            styles.histories,
            {
              backgroundColor: theme.background.tertiary,
              borderColor: theme.border.primary,
            },
          ]}
        >
          {histories.map((history, index) => (
            <AppView
              key={history.id + index}
              style={[
                styles.history,
                {
                  borderColor: theme.border.primary,
                  borderBottomWidth: index === histories.length - 1 ? 0 : 1,
                },
              ]}
            >
              <AppView style={styles.left}>
                <AppImage
                  source={upiAppLogo[history.appName]}
                  style={styles.logoImage}
                />
              </AppView>
              <AppView style={styles.right}>
                <AppView style={styles.rightLeft}>
                  <AppText variant="button">{history.appName}</AppText>
                  <AppText variant="bodySmall" color="tertiary">
                    {new DateTime(history.date).formatTo("datetime")}
                  </AppText>
                </AppView>
                <AppView style={styles.rightRight}>
                  <Amount value={history.amount} size={10} />
                  <AppIcon
                    name="qr-code"
                    size={18}
                    color={theme.text.primary}
                  />
                </AppView>
              </AppView>
            </AppView>
          ))}
        </AppView>
      ) : (
        <EmptyCard message="Your all histories will appear here." />
      )}
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    width: "100%",
    minWidth: "100%",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  histories: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
  },
  history: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1.5,
    gap: 8,
  },
  left: {},
  right: {
    flex: 1,
    flexDirection: "row",
  },
  logoImage: {
    width: 24,
    height: 24,
  },
  rightLeft: {
    flex: 1,
    gap: 4,
  },
  rightRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
