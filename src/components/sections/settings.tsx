import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { DeleteEverything } from "../delete-everything";
import { Setting } from "../setting";
import { Ionicons, ThemedText, ThemedView } from "../ui";

export function Settings() {
  const theme = useTheme();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [settingsOn, setSettingsOn] = useState(true);

  const handleOnSettingPress = () => {
    if (isAuthenticated) {
      setSettingsOn((prevState) => !prevState);
    } else {
      router.navigate("/(modals)/authenticate");
    }
  };

  return (
    <ThemedView
      style={[styles.settings, { backgroundColor: theme.backgroundElement }]}
    >
      <Pressable
        onPress={handleOnSettingPress}
        style={[
          styles.shared,
          styles.deleteEverything,
          {
            borderColor: theme.background,
            borderBottomWidth: settingsOn ? 1 : 0,
          },
        ]}
      >
        <Ionicons name="settings" size={18} color={theme.text} />
        <ThemedText>Settings</ThemedText>
        <Ionicons
          name={settingsOn ? "chevron-up" : "chevron-down"}
          size={18}
          color={theme.text}
          style={{ marginLeft: "auto" }}
        />
      </Pressable>
      {isAuthenticated && settingsOn && (
        <>
          <DeleteEverything borderBottomWidth={0} />
          <Setting
            leftIcon="snow"
            label="View All Transaction"
            onPress={() => {
              router.navigate("/(modals)/transactions");
            }}
          />
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  shared: {
    backgroundColor: "transparent",
  },
  settings: {
    flex: 1,
    marginBottom: 16,
    borderRadius: 28,
  },
  deleteEverything: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
