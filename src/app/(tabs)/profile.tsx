import { Settings, UpiIds } from "@/components/sections";
import { SafeAreaScrollView, ThemedText, ThemedView } from "@/components/ui";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { Image, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const theme = useTheme();
  const name = useDataStore((state) => state.user?.name);

  return (
    <SafeAreaScrollView>
      <ThemedView style={styles.userProfileContainer}>
        <ThemedView
          style={[
            styles.userProfileAvatarContainer,
            {
              backgroundColor: theme.surface,
            },
          ]}
        >
          <Image
            source={require("@/assets/images/tabIcons/user.png")}
            style={[styles.userProfileAvatar, { tintColor: theme.primary }]}
          />
        </ThemedView>
        <ThemedText style={styles.userProfileName}>Hi, {name}</ThemedText>
      </ThemedView>
      <Settings />
      <UpiIds />
    </SafeAreaScrollView>
  );
}

const styles = StyleSheet.create({
  userProfileContainer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
    gap: spacing[16],
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
