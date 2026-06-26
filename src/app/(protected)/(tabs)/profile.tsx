import {
  AppIcon,
  AppImage,
  AppPressable,
  AppSafeAreaView,
  AppScrollView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { SavedUpiAppSection, SettingSection } from "@/components/sections";
import { SCREEN_PADDING } from "@/constants/screen";
import IdentityVerification from "@/features/identity-verification/components";
import { useIdentityVerificationStore } from "@/features/identity-verification/store";
import { useSheet } from "@/features/sheets/use-sheet";
import { useTheme } from "@/hooks/use-theme";
import { useUserStore } from "@/store/user-store";
import { StyleSheet } from "react-native";

export default function ProfileScreen() {
  const theme = useTheme();
  const sheet = useSheet();
  const resetIdentity = useIdentityVerificationStore(
    (state) => state.resetIdentity,
  );
  const name = useUserStore((state) => state.user?.name);

  return (
    <AppSafeAreaView>
      <AppScrollView contentContainerStyle={{ gap: 16 }}>
        <AppView style={{ marginVertical: 16, marginTop: 24 }}>
          <AppText variant="headingMedium" style={{ textAlign: "center" }}>
            Settings
          </AppText>
        </AppView>

        <AppView
          style={[
            styles.profileCard,
            {
              backgroundColor: theme.background.card,
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
          <AppText variant="headingSmall">{name}</AppText>
          <AppPressable
            onPress={() => {
              resetIdentity();
            }}
            style={{ marginLeft: "auto", marginRight: 8 }}
          >
            <AppIcon name="log-out" size={24} color={theme.text.tertiary} />
          </AppPressable>
        </AppView>

        <SettingSection />
        <SavedUpiAppSection />

        {/* Legal Information */}
        <AppView style={styles.legalInformationContainer}>
          <AppPressable
            onPress={() => {
              sheet.push("PrivacyPolicySheet", {});
            }}
          >
            <AppText variant="bodySmall" color="muted">
              Terms of Service and Privacy Policy
            </AppText>
          </AppPressable>
        </AppView>
      </AppScrollView>

      {/* Verify User Identity */}
      <IdentityVerification />
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: SCREEN_PADDING / 2,
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
    padding: SCREEN_PADDING,
  },
});
