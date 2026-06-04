import {
  AppSafeAreaView,
  AppScrollView,
  AppText,
  AppView,
} from "@/components/app-ui";
import {
  IdentityBottomSheet,
  TransactionBottomSheet,
} from "@/components/bottom-sheets";
import { SavedUpiAppSection, SettingSection } from "@/components/sections";
import { useTheme } from "@/hooks/use-theme";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { useIdentityStore } from "@/store/identity-store";
import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const theme = useTheme();
  const name = useUserStore((state) => state.user?.name);
  const expand = useBottomSheetStore((state) => state.expand);
  const isSessionValid = useIdentityStore((state) => state.isSessionValid);

  useEffect(() => {
    if (!isSessionValid()) {
      expand("IDENTITY");
    }
  }, [isSessionValid, expand]);

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
          <AppText style={styles.userProfileName}>Hi, {name}</AppText>
        </AppView>
        <SettingSection />
        <SavedUpiAppSection />
      </AppScrollView>
      <TransactionBottomSheet />
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
});
