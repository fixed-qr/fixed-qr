import { Authenticate, Transactions } from "@/components/modals";
import { Settings, UpiIds } from "@/components/sections";
import {
    AppSafeAreaView,
    AppScrollView,
    AppText,
    AppView,
} from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Image, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const theme = useTheme();
  const name = useDataStore((state) => state.user?.name);
  const bottomSheetRef = useRef<BottomSheet>(null);

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
              source={require("@/assets/images/tabIcons/user.png")}
              style={[
                styles.userProfileAvatar,
                { tintColor: theme.accent.primary },
              ]}
            />
          </AppView>
          <AppText style={styles.userProfileName}>Hi, {name}</AppText>
        </AppView>
        <Settings
          onTransactionsButtonPress={() => {
            bottomSheetRef.current?.snapToIndex(0);
          }}
        />
        <UpiIds />
      </AppScrollView>
      <Transactions ref={bottomSheetRef} />
      <Authenticate />
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
