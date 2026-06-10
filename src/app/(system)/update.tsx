import {
  AppIcon,
  AppImage,
  AppPressable,
  AppSafeAreaView,
  AppScrollView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useAppUpdateStore } from "@/store/app-update-store";
import { openURL } from "expo-linking";
import { ActivityIndicator, StyleSheet } from "react-native";

const updateGuide: string[] = [
  "Tap the `Download APK` or `Website` button.",
  "Download the latest version of the APK.",
  "Open the downloaded APK file.",
  "If prompted, allow installation from unknown sources.",
  "Tap `Update` and wait for the process to complete.",
  "Open the app and continue using the latest version.",
];

export default function UpdateScreen() {
  const theme = useTheme();
  const { appUpdate, isLoading } = useAppUpdateStore();

  if (isLoading) {
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
            source={require("@/assets/images/icons/system/update.png")}
            style={styles.updateImage}
          />
          <AppText
            variant="bodyLarge"
            weight="500"
            style={{ textAlign: "center" }}
          >
            {appUpdate?.title}
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
              <AppText>{appUpdate?.version}</AppText>
            </AppView>
            <AppView
              style={[styles.releaseRow, { borderColor: theme.border.primary }]}
            >
              <AppView style={styles.releaseInfo}>
                <AppIcon name="watch" color={theme.text.primary} size={14} />
                <AppText variant="bodyMedium">Date Time</AppText>
              </AppView>
              <AppText>{appUpdate?.publishedAt}</AppText>
            </AppView>
            <AppView style={[styles.releaseRow, styles.releaseNotes]}>
              <AppText variant="bodyMedium">Release Notes</AppText>
              <AppView>
                {appUpdate?.notes.map((note, index) => (
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

        {/* Action buttons */}
        <AppView>
          <AppPressable
            onPress={() => {
              openURL(appUpdate?.downloadUrl as string);
            }}
            style={({ pressed }) => [
              styles.button,
              {
                borderColor: theme.border.primary,
                backgroundColor: pressed
                  ? theme.background.cardMuted
                  : theme.background.card,
              },
            ]}
          >
            <AppText variant="button">Download APK</AppText>
          </AppPressable>
          <AppPressable
            onPress={() => {
              openURL(appUpdate?.websiteUrl as string);
            }}
            style={({ pressed }) => [
              styles.button,
              {
                borderColor: theme.border.primary,
                backgroundColor: pressed
                  ? theme.background.cardMuted
                  : theme.background.card,
              },
            ]}
          >
            <AppText variant="button">Website</AppText>
          </AppPressable>
        </AppView>

        {/* How to update guide */}
        <AppView>
          <AppText
            variant="bodyMedium"
            weight="500"
            color="tertiary"
            style={styles.releaseTitle}
          >
            How to update
          </AppText>
          <AppView style={styles.guideRowContainer}>
            {updateGuide.map((guide: string, index: number) => (
              <AppView style={styles.guideRow} key={guide + index}>
                <AppText variant="bodySmall" color="secondary">
                  {index + 1}.
                </AppText>
                <AppText variant="bodySmall" color="secondary">
                  {guide}
                </AppText>
              </AppView>
            ))}
          </AppView>
        </AppView>
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
    marginTop: 20,
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
  button: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 99,
    borderWidth: 1,
  },
  guideRowContainer: {
    paddingLeft: 8,
    gap: 8,
  },
  guideRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
});
