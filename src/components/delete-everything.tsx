import { useAuthStore } from "@/store/auth-store";
import { useDataStore } from "@/store/data-store";
import { useRouter } from "expo-router";
import { Alert, StyleSheet } from "react-native";
import { Setting } from "./setting";

export function DeleteEverything() {
  const router = useRouter();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const clearAll = useDataStore((state) => state.clearAll);

  const handelOnPress = () => {
    Alert.alert(
      "Delete Everything",
      "Are you sure you want to delete everything? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            clearAll();
            setIsAuthenticated(false);
            router.replace("/(auth)/get-started");
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <Setting
      leftIcon="trash"
      label="Delete Everything"
      onPress={handelOnPress}
    />
  );
}

const styles = StyleSheet.create({});
