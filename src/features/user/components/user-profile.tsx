import {
    AppIcon,
    AppImage,
    AppPressable,
    AppText,
    AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import { useUserStore } from "../store";

export function UserProfile() {
  const theme = useTheme();

  const name = useUserStore((state) => state.user?.name);

  return (
    <AppView
      style={[
        styles.profile,
        {
          backgroundColor: theme.background.secondary,
          borderColor: theme.border.primary,
        },
      ]}
    >
      <AppView style={styles.profileImageContainer}>
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
      <AppText variant="headingSmall" style={{ textTransform: "capitalize" }}>
        {name}
      </AppText>
      <AppPressable
        onPress={() => {}}
        style={{ marginLeft: "auto", marginRight: 8 }}
      >
        <AppIcon name="log-out" size={24} color={theme.text.tertiary} />
      </AppPressable>
    </AppView>
  );
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderRadius: 99,
    borderWidth: 1,
  },

  profileImageContainer: {
    aspectRatio: 1,
    width: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
  },
});
