import {
  AppIcon,
  AppImage,
  AppPressable,
  AppScreenView,
  AppScrollView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { Settings } from "@/components/settings";
import { SCREEN_PADDING } from "@/constants/screen";
import { UpiApp } from "@/features/upi-app/components";
import { VerifyUserIdentity } from "@/features/user/components";
import { useUserStore } from "@/features/user/store";
import { useTheme } from "@/hooks/use-theme";
import { useSheet } from "@/sheets/use-sheet";
import { StyleSheet } from "react-native";

export default function SettingScreen() {
  const theme = useTheme();
  const sheet = useSheet();

  const name = useUserStore((state) => state.user?.name);

  return (
    <AppScreenView>
      <AppScrollView contentContainerStyle={{ gap: 8 }}>
        <AppView style={{ marginVertical: 16, marginTop: 24 }}>
          <AppText variant="headingMedium" style={{ textAlign: "center" }}>
            Settings
          </AppText>
        </AppView>

        <AppView
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.background.secondary,
              borderColor: theme.border.primary,
            },
          ]}
        >
          <AppView style={styles.profileCardImageContainer}>
            <AppImage
              source={require("@/assets/images/icons/tab/user-profile.png")}
              style={[
                {
                  tintColor: theme.text.primary,
                  objectFit: "contain",
                  width: "90%",
                  height: "90%",
                },
              ]}
            />
          </AppView>
          <AppText
            variant="headingSmall"
            style={{ textTransform: "capitalize" }}
          >
            {name}
          </AppText>
          <AppPressable
            onPress={() => {}}
            style={{ marginLeft: "auto", marginRight: 8 }}
          >
            <AppIcon name="log-out" size={24} color={theme.text.tertiary} />
          </AppPressable>
        </AppView>

        {/* Settings */}
        <AppView style={{ marginTop: 16 }}>
          <Settings />
        </AppView>

        {/* UPI Apps */}
        <AppView style={{ marginTop: 16 }}>
          <UpiApp />
        </AppView>

        {/* Legal Information */}
        <AppView style={styles.legalInformationContainer}>
          <AppPressable
            onPress={() => {
              sheet.push("PrivacyPolicySheet", {});
            }}
          >
            <AppText variant="bodySmall" color="muted">
              Terms of Service & Privacy Policy
            </AppText>
          </AppPressable>
        </AppView>
      </AppScrollView>

      {/* Verify User Identity */}
      <VerifyUserIdentity />
    </AppScreenView>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderRadius: 99,
    borderWidth: 1,
  },
  profileCardImageContainer: {
    aspectRatio: 1,
    width: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
  },
  legalInformationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 8,
  },
});
