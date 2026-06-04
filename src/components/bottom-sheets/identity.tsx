import { PasswordInput } from "@/components";
import { AppBottomSheet, AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet } from "react-native";

import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { useIdentityStore } from "@/store/identity-store";
import { useUserStore } from "@/store/user-store";
import { Ionicons } from "@expo/vector-icons";
export function IdentityBottomSheet() {
  const theme = useTheme();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const ref = useBottomSheetStore((state) =>
    state.register("identity-bottom-sheet"),
  );
  const storedPassword = useUserStore((state) => state.user?.password);
  const verifyIdentity = useIdentityStore((state) => state.verifyIdentity);

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

    verifyIdentity();
    ref.current?.close();
    Keyboard.dismiss();
  };

  return (
    <AppBottomSheet
      ref={ref}
      index={0}
      enableDynamicSizing={true}
      enablePanDownToClose={false}
      backdropPressBehavior="none"
    >
      <BottomSheetView
        style={{
          backgroundColor: theme.background.secondary,
          paddingHorizontal: 20,
        }}
      >
        <AppView style={{ alignItems: "center", marginBottom: 16 }}>
          <AppText variant="headingSmall" weight="600">
            Verify Your Identity
          </AppText>
        </AppView>
        <PasswordInput
          value={password}
          onChangeText={handlePasswordChange}
          onSubmitEditing={handleOnSubmit}
        />
        {!!error && (
          <AppView
            style={[
              styles.error,
              { backgroundColor: theme.background.secondary },
            ]}
          >
            <AppText variant="bodySmall" style={{ color: theme.status.danger }}>
              {error}
            </AppText>
          </AppView>
        )}
        <Pressable
          onPress={handleOnSubmit}
          style={({ pressed }) => [
            styles.authenticateButton,
            {
              borderColor: pressed ? theme.border.focus : theme.border.primary,
              backgroundColor: pressed
                ? theme.accent.pressed
                : theme.accent.primary,
            },
          ]}
        >
          <AppText variant="button" color="inverse">
            Authenticate
          </AppText>
          <Ionicons
            name="arrow-up"
            size={18}
            color={theme.text.inverse}
            style={{
              transform: [{ rotate: "45deg" }],
            }}
          />
        </Pressable>
      </BottomSheetView>
    </AppBottomSheet>
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
