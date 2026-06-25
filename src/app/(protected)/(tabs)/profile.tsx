import {
  AppPressable,
  AppSafeAreaView,
  AppScrollView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { IdentityBottomSheet } from "@/components/bottom-sheets";
import { SavedUpiAppSection, SettingSection } from "@/components/sections";
import { SCREEN_PADDING } from "@/constants/screen";
import { useSheet } from "@/features/sheets/use-sheet";
import { useTheme } from "@/hooks/use-theme";
import { useUserStore } from "@/store/user-store";
import { Image, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const theme = useTheme();
  const sheet = useSheet();
  const name = useUserStore((state) => state.user?.name);

  return (
    <AppSafeAreaView>
      <AppScrollView>
        <AppView style={styles.userProfileContainer}>
          <AppView
            style={[
              styles.userProfileAvatarContainer,
              {
                backgroundColor: theme.background.surface,
              },
            ]}
          >
            <Image
              source={require("@/assets/images/icons/tab/user-profile.png")}
              style={[
                styles.userProfileAvatar,
                { tintColor: theme.text.primary },
              ]}
            />
          </AppView>
          <AppText style={styles.userProfileName}>{name}</AppText>
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

      <IdentityBottomSheet />
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  userProfileContainer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
    gap: 16,
  },
  userProfileAvatarContainer: {
    aspectRatio: 1,
    width: 100,
    borderRadius: 999,
  },
  userProfileAvatar: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  userProfileName: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: 600,
    textTransform: "capitalize",
  },
  legalInformationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SCREEN_PADDING,
  },
});
