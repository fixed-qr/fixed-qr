import {
  AppIcon,
  AppImage,
  AppPressable,
  AppSafeAreaView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";

export default function DiscontinuedScreen() {
  const theme = useTheme();

  return (
    <AppSafeAreaView style={styles.container}>
      <AppView style={styles.maintenance}>
        <AppImage
          source={require("@/assets/images/icons/system/discontinued.png")}
          style={styles.maintenanceImage}
        />
        <AppText variant="bodyLarge" weight="500">
          Discontinued
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
        <AppText variant="button">Website</AppText>
        <AppIcon
          name="arrow-up"
          color={theme.text.primary}
          size={16}
          style={{ transform: "rotate(45deg)" }}
        />
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
