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
  }, [isAuthenticated]);

  const handlePasswordChange = (value: string) => {
    setError("");
    setPassword(value);
  };

  const handleOnSubmit = () => {
    const trimmedPassword = password.trim();

    if (!trimmedPassword) {
      setError("Password is required");
      return;
    }

    if (trimmedPassword !== storedPassword) {
      setError("Incorrect password");
      return;
    }

    setError("");

    Keyboard.dismiss();
    setIsAuthenticated(true);
    bottomSheetRef.current?.close();
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <UIBottomSheet
      title="Verify Your Identity"
      ref={bottomSheetRef}
      enableDynamicSizing
      enablePanDownToClose={false}
      backdropPressBehavior="none"
    >
      <SecureInput
        value={password}
        onChangeText={handlePasswordChange}
        onSubmitEditing={handleOnSubmit}
      />
      {!!error && (
        <ThemedView
          style={[
            styles.error,
            { backgroundColor: theme.background.secondary },
          ]}
        >
          <ThemedText variant="small" style={{ color: theme.status.danger }}>
            {error}
          </ThemedText>
        </ThemedView>
      )}
      <Pressable
        onPress={handleOnSubmit}
        style={({ pressed }) => [
          styles.authenticateButton,
          {
            borderColor: theme.border.primary,
            backgroundColor: pressed
              ? theme.accent.pressed
              : theme.accent.primary,
          },
        ]}
      >
        <ThemedText weight="600" style={{ color: theme.text.inverse }}>
          Authenticate
        </ThemedText>
        <Ionicons
          name="arrow-up"
          size={18}
          color={theme.text.inverse}
          style={{
            transform: [{ rotate: "45deg" }],
          }}
        />
      </Pressable>
    </UIBottomSheet>
  );
}

const styles = StyleSheet.create({
  error: {
    marginTop: 8,
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
