import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/auth-store";
import { useDataStore } from "@/store/data-store";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons, ThemedText } from "./ui";

export function DeleteEverything() {
  const theme = useTheme();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAll = useDataStore((state) => state.clearAll);

  const handelOnPress = () => {
    if (isAuthenticated) {
      clearAll();
      router.replace("/(auth)/get-started");
    } else {
      router.navigate("/(modals)/authenticate");
    }
  };

  return (
    <Pressable
      onPress={handelOnPress}
      style={({ pressed }) => [
        styles.deleteEverything,
        {
          backgroundColor: pressed
            ? theme.backgroundSelected
            : theme.backgroundElement,
        },
      ]}
    >
      <Ionicons name="trash" size={18} color={theme.text} />
      <ThemedText>Delete Everything</ThemedText>
      <Ionicons
        name="arrow-forward"
        size={18}
        color={theme.text}
        style={{ marginLeft: "auto" }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  deleteEverything: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 99,
  },
});
