import { EmptyCard } from "@/components";
import {
  AppGroup,
  AppIcon,
  AppImage,
  AppText,
  AppView,
} from "@/components/app-ui";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useTheme } from "@/hooks/use-theme";
import { useSavedUpiAppStore } from "@/store/saved-upi-app-store";
import { UpiAppName } from "@/types/upi-app-name";
import { useRouter } from "expo-router";
import { Alert, Pressable, StyleSheet } from "react-native";

export function SavedUpiAppSection() {
  const theme = useTheme();
  const router = useRouter();
  const savedUpiApps = useSavedUpiAppStore((state) => state.savedUpiApps);
  const removeUpiApp = useSavedUpiAppStore((state) => state.removeUpiApp);

  const handleRemoveUpiApp = (appName: UpiAppName) => {
    Alert.alert(
      "Remove UPI ID",
      `Are you sure you want to remove this UPI ID (${appName})?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            removeUpiApp(appName);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <AppView style={styles.container}>
      <AppGroup
        title="Saved UPI IDs"
        titleIconName="add-circle"
        onTitlePress={() => {
          router.navigate("/(protected)/(modals)/upi/add");
        }}
      >
        {Object.keys(savedUpiApps).length ? (
          Object.values(savedUpiApps).map((upiApp, index) => (
            <AppView
              key={upiApp.appName}
              style={[
                styles.upiId,
                {
                  borderColor: theme.border.primary,
                  borderBottomWidth:
                    Object.keys(savedUpiApps).length - 1 == index ? 0 : 1,
                },
              ]}
            >
              <AppView style={styles.left}>
                <AppImage
                  source={upiAppLogo[upiApp.appName]}
                  style={styles.logoImage}
                />
                <AppView style={styles.upiIdInfo}>
                  <AppText variant="button">{upiApp.appName}</AppText>
                  <AppText variant="bodySmall" color="tertiary">
                    {upiApp.upiId}
                  </AppText>
                </AppView>
              </AppView>
              <AppView style={styles.right}>
                <Pressable
                  onPress={() => {
                    handleRemoveUpiApp(upiApp.appName);
                  }}
                >
                  <AppIcon name="close" size={18} color={theme.text.primary} />
                </Pressable>
              </AppView>
            </AppView>
          ))
        ) : (
          <EmptyCard message="Your Saved UPI ID will appear here." />
        )}
      </AppGroup>
    </AppView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  upiId: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  right: {},
  logoImage: {
    width: 24,
    height: 24,
  },
  upiIdInfo: {
    gap: 2,
  },
});
