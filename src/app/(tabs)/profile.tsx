import { UpiIds } from "@/components/sections";
import { SafeAreaScrollView, ThemedText, ThemedView } from "@/components/ui";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useStore } from "@/store/useStore";
import { Image, StyleSheet } from "react-native";

export default function ProfileScreen() {
  const theme = useTheme();
  const name = useStore((state) => state.user?.name);

  return (
    <SafeAreaScrollView>
      <ThemedView style={styles.userProfileContainer}>
        <ThemedView
          style={[
            styles.userProfileAvatarContainer,
            {
              backgroundColor: theme.surface,
              borderColor: theme.border,
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
      <UpiIds />
    </SafeAreaScrollView>
  );
}

const styles = StyleSheet.create({
  userProfileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBlock: 32,
    gap: spacing[16],
  },
  userProfileAvatarContainer: {
    width: "45%",
    maxWidth: "45%",
    aspectRatio: 1,
    borderRadius: 999,
    borderWidth: 1,
  },
  userProfileAvatar: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  userProfileName: {
    flex: 1,
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: 600,
    textTransform: "capitalize",
  },
});
