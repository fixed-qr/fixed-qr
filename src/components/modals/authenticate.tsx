import { SecureInput } from "@/components";
import {
    Ionicons,
    ThemedText,
    ThemedView,
    UIBottomSheet,
} from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/auth-store";
import { useDataStore } from "@/store/data-store";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Pressable, StyleSheet } from "react-native";

export function Authenticate() {
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const storedPassword = useDataStore((state) => state.user?.password);
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      bottomSheetRef.current?.close();
    }
  }, []);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleOnSubmit = () => {
    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setError("");

    if (password === storedPassword) {
      setIsAuthenticated(true);
      bottomSheetRef.current?.close();
      Keyboard.dismiss();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <UIBottomSheet
      title="Verify Your Identity"
      ref={bottomSheetRef}
      enableDynamicSizing={true}
      enablePanDownToClose={false}
      backdropPressBehavior="none"
    >
      <SecureInput value={password} onChangeText={handlePasswordChange} />
      {!!error && (
        <ThemedView style={styles.error}>
          <ThemedText type="small" color="danger">
            {error}
          </ThemedText>
        </ThemedView>
      )}
      <Pressable
        onPress={handleOnSubmit}
        style={({ pressed }) => [
          styles.authenticateButton,
          {
            borderColor: theme.border,
            backgroundColor: pressed ? theme.primaryHover : theme.primary,
          },
        ]}
      >
        <ThemedText color="textInverse">Authenticate</ThemedText>
        <Ionicons
          name="arrow-up"
          size={18}
          color={theme.textInverse}
          style={{ transform: "rotate(45deg)" }}
        />
      </Pressable>
    </UIBottomSheet>
  );
}

const styles = StyleSheet.create({
  error: {
    width: "90%",
  },
  authenticateButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    width: "100%",
    height: 48,
    padding: 8,
    borderRadius: 48,
    borderWidth: 1,
  },
});
