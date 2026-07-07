import {
  AppPressable,
  AppScreenView,
  AppScrollView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { Settings } from "@/components/settings";
import { SCREEN_PADDING } from "@/constants/screen";
import { UpiApp } from "@/features/upi-app/components";
import { UserProfile, VerifyUserIdentity } from "@/features/user/components";
import { useSheet } from "@/sheets/use-sheet";
import { StyleSheet } from "react-native";

export default function SettingScreen() {
  const sheet = useSheet();

  return (
    <AppScreenView>
      <AppScrollView contentContainerStyle={{ gap: 8 }}>
        <AppView style={{ marginVertical: 16, marginTop: 24 }}>
          <AppText variant="headingMedium" style={{ textAlign: "center" }}>
            Settings
          </AppText>
        </AppView>

        {/* User Profile */}
        <UserProfile />

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
  legalInformationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 8,
  },
});
