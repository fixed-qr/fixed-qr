import {
  AppIcon,
  AppImage,
  AppSafeAreaView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { Pressable, StyleSheet } from "react-native";

export default function Maintenance() {
  const theme = useTheme();

  return (
    <AppSafeAreaView style={styles.container}>
      <AppView style={styles.maintenance}>
        <AppImage
          source={require("@/assets/images/icons/others/maintenance.png")}
          style={styles.maintenanceImage}
          tintColor={theme.status.info}
        />
        <AppText variant="bodyLarge" weight="500">
          Under Maintenance
        </AppText>
        <AppText
          variant="bodySmall"
          color="tertiary"
          style={styles.maintenanceMessage}
        >
          The app is currently under maintenance. We are working hard to get
          everything back up and running as soon as possible. Thank you for your
          patience and understanding.
        </AppText>
      </AppView>
      <Pressable
        onPress={() => {}}
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
        <AppIcon name="refresh" color={theme.text.primary} size={16} />
        <AppText variant="button">Refresh</AppText>
      </Pressable>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  maintenance: {
    alignItems: "center",
    marginTop: 64,
  },
  maintenanceImage: {
    width: 100,
    height: 100,
    marginTop: 12,
    marginBottom: 16,
  },
  maintenanceMessage: {
    marginTop: 4,
    textAlign: "center",
  },
  downloadButton: {
    marginTop: 32,
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
