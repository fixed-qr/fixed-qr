import {
    AppIcon,
    AppImage,
    AppSafeAreaView,
    AppScrollView,
    AppText,
    AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useAppConfigStore } from "@/store/app-config-store";
import { openURL } from "expo-linking";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

export default function Update() {
  const theme = useTheme();
  const { appConfig, loading } = useAppConfigStore();

  if (loading) {
    return (
      <AppSafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color={theme.text.primary} size={24} />
      </AppSafeAreaView>
    );
  }

  return (
    <AppSafeAreaView style={styles.container}>
      <AppScrollView>
        <AppView style={styles.update}>
          <AppImage
            source={require("@/assets/icons/other/update.png")}
            style={styles.updateImage}
            tintColor={theme.status.info}
          />
          <AppText
            variant="bodyLarge"
            weight="500"
            style={{ textAlign: "center" }}
          >
            {appConfig?.release.title}
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
              <AppText>{appConfig.release.version}</AppText>
            </AppView>
            <AppView
              style={[styles.releaseRow, { borderColor: theme.border.primary }]}
            >
              <AppView style={styles.releaseInfo}>
                <AppIcon name="watch" color={theme.text.primary} size={14} />
                <AppText variant="bodyMedium">Date Time</AppText>
              </AppView>
              <AppText>{appConfig.release.publishedAt}</AppText>
            </AppView>
            <AppView style={[styles.releaseRow, styles.releaseNotes]}>
              <AppText variant="bodyMedium">Release Notes</AppText>
              <AppView>
                {appConfig.release.notes.map((note, index) => (
                  <AppView style={styles.releaseNotesRow} key={note + index}>
                    <AppView
                      style={[
                        styles.noteDot,
                        { backgroundColor: theme.text.tertiary },
                      ]}
                    />
                    <AppText variant="bodySmall" color="tertiary">
                      {note}
                    </AppText>
                  </AppView>
                ))}
              </AppView>
            </AppView>
          </AppView>
        </AppView>
        <Pressable
          onPress={() => {
            openURL(appConfig.release.downloadUrl);
          }}
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
          <AppText variant="button">Download</AppText>
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
  update: {
    alignItems: "center",
    marginTop: 48,
  },
  updateImage: {
    width: 100,
    height: 100,
    marginTop: 12,
    marginBottom: 16,
  },
  updateMessage: {
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
