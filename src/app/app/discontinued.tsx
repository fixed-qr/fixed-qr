import {
  AppIcon,
  AppImage,
  AppSafeAreaView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { Pressable, StyleSheet } from "react-native";

export default function Discontinued() {
  const theme = useTheme();

  return (
    <AppSafeAreaView style={styles.container}>
      <AppView style={styles.maintenance}>
        <AppImage
          source={require("@/assets/images/icons/others/discontinued.png")}
          style={styles.maintenanceImage}
          tintColor={theme.status.danger}
        />
        <AppText variant="bodyLarge" weight="500">
          App Discontinued
        </AppText>
        <AppText
          variant="bodySmall"
          color="tertiary"
          style={styles.maintenanceMessage}
        >
          This app has been discontinued and is no longer available for download
          and use. for more information, please contact support or visit our
          website.
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
        <AppText variant="button">Visit Our Website</AppText>
        <AppIcon
          name="arrow-up"
          color={theme.text.primary}
          size={16}
          style={{ transform: "rotate(45deg)" }}
        />
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
