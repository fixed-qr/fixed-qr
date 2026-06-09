import {
  AppImage,
  AppPressable,
  AppSafeAreaView,
  AppText,
  AppView
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";

export default function MaintenanceScreen() {
  const theme = useTheme();

  return (
    <AppSafeAreaView style={styles.container}>
      <AppView style={styles.maintenance}>
        <AppImage
          source={require("@/assets/images/icons/system/maintenance.png")}
          style={styles.maintenanceImage}
          tintColor={theme.status.info}
        />
        <AppText variant="bodyLarge" weight="500">
          Maintenance
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

      {/* Refresh button. */}
      <AppPressable
        onPress={() => {}}
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
        <AppText variant="button">Check</AppText>
      </AppPressable>
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
    marginTop: 20,
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
    marginBottom: 32,
  },
  button: {
    width: "100%",
    height: 48,
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
