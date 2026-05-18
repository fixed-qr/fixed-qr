import {
    AppIcon,
    AppImage,
    AppSafeAreaView,
    AppScrollView,
    AppText,
    AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { Pressable, StyleSheet } from "react-native";

export default function AppStatusScreen() {
  const theme = useTheme();

  return (
    <AppSafeAreaView style={styles.container}>
      <AppScrollView>
        <AppView style={styles.appStatus}>
          <AppImage
            source={require("@/assets/icons/app-status/ok.png")}
            style={styles.appStatusImage}
            tintColor={theme.status.success}
          />
          <AppText variant="bodyLarge" weight="500">
            System Operational
          </AppText>
          <AppText
            variant="bodySmall"
            color="tertiary"
            style={styles.appStatusMessage}
          >
            All service running smoothly. Enjoy the app!
          </AppText>
        </AppView>
        <AppView style={styles.release}>
          <AppText
            variant="bodyMedium"
            weight="500"
            color="tertiary"
            style={styles.releaseTitle}
          >
            Latest Release
          </AppText>
          <AppView
            style={[
              styles.releaseCard,
              {
                backgroundColor: theme.background.card,
                borderColor: theme.border.primary,
              },
            ]}
          >
            <AppView
              style={[styles.releaseRow, { borderColor: theme.border.primary }]}
            >
              <AppView style={styles.releaseInfo}>
                <AppIcon
                  name="git-merge"
                  color={theme.text.primary}
                  size={14}
                />
                <AppText variant="bodyMedium">Version</AppText>
              </AppView>
              <AppText>1.0.0</AppText>
            </AppView>
            <AppView
              style={[styles.releaseRow, { borderColor: theme.border.primary }]}
            >
              <AppView style={styles.releaseInfo}>
                <AppIcon name="book" color={theme.text.primary} size={14} />
                <AppText variant="bodyMedium">Title</AppText>
              </AppView>
              <AppText>Security Update</AppText>
            </AppView>
            <AppView
              style={[styles.releaseRow, { borderColor: theme.border.primary }]}
            >
              <AppView style={styles.releaseInfo}>
                <AppIcon name="watch" color={theme.text.primary} size={14} />
                <AppText variant="bodyMedium">Data</AppText>
              </AppView>
              <AppText>2026-05-20 03:20:56</AppText>
            </AppView>
            <AppView style={[styles.releaseRow, styles.releaseNotes]}>
              <AppText variant="bodyMedium">Release Notes</AppText>
              <AppView>
                <AppView style={styles.releaseNotesRow}>
                  <AppView
                    style={[
                      styles.noteDot,
                      { backgroundColor: theme.text.tertiary },
                    ]}
                  />
                  <AppText variant="bodySmall" color="tertiary">
                    Performance improvements
                  </AppText>
                </AppView>
                <AppView style={styles.releaseNotesRow}>
                  <AppView
                    style={[
                      styles.noteDot,
                      { backgroundColor: theme.text.tertiary },
                    ]}
                  />
                  <AppText variant="bodySmall" color="tertiary">
                    Improved security
                  </AppText>
                </AppView>
              </AppView>
            </AppView>
          </AppView>
        </AppView>
        <Pressable
          style={({ pressed }) => [
            styles.downloadButton,
            {
              backgroundColor: pressed
                ? theme.background.cardMuted
                : theme.background.card,
              borderColor: pressed ? theme.border.focus : theme.border.primary,
            },
          ]}
        >
          <AppIcon name="code-download" color={theme.text.primary} size={16} />
          <AppText variant="button">Download to Update</AppText>
        </Pressable>
      </AppScrollView>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  appStatus: {
    alignItems: "center",
    marginTop: 48,
  },
  appStatusImage: {
    width: 100,
    height: 100,
    marginTop: 12,
    marginBottom: 16,
  },
  appStatusMessage: {
    marginTop: 4,
    textAlign: "center",
  },
  release: {
    width: "100%",
  },
  releaseTitle: {
    marginTop: 16,
    marginBottom: 8,
    paddingLeft: 8,
  },
  releaseCard: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 28,
    borderWidth: 1,
  },
  releaseRow: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  releaseInfo: {
    flexDirection: "row",
    marginRight: "auto",
    gap: 8,
    alignItems: "center",
  },
  releaseNotes: {
    borderBottomWidth: 0,
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 8,
  },
  releaseNotesRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  noteDot: {
    aspectRatio: 1,
    width: 4.5,
    borderRadius: 4.5,
  },
  downloadButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
    borderWidth: 1,
  },
});
