import { useAuthStore } from "@/store/auth-store";
import { useDataStore } from "@/store/data-store";
import { useRouter } from "expo-router";
import { Alert, StyleSheet } from "react-native";
import { Setting } from "./setting";

interface DeleteEverythingProps {
  borderBottomWidth?: number;
}

export function DeleteEverything({ borderBottomWidth }: DeleteEverythingProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAll = useDataStore((state) => state.clearAll);

  const handelOnPress = () => {
    if (isAuthenticated) {
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
              router.replace("/(auth)/get-started");
            },
          },
        ],
        {
          cancelable: true,
        },
      );
    } else {
      router.navigate("/(modals)/authenticate");
    }
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
