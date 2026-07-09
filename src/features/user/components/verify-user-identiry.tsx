import { PasswordInput } from "@/components";
import {
  AppPressable,
  AppScreenView,
  AppScrollView,
  AppText,
  AppView,
} from "@/components/app-ui";
import { Settings } from "@/components/settings";
import { SCREEN_PADDING } from "@/constants/screen";
import { useUserStore } from "@/features/user/store";
import { useTheme } from "@/hooks/use-theme";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";
import { UserProfile } from "./user-profile";

export function VerifyUserIdentity() {
  const theme = useTheme();

  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, verifyIdentity } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      verifyIdentity: state.verifyIdentity,
    })),
  );

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

    if (trimmedPassword !== user?.password) {
      setError("Incorrect password");
      return;
    }

    setError("");

    // Verify user identity
    verifyIdentity();

    // Replace with target url
    router.navigate("/(protected)/(tabs)/settings");
  };

  return (
    <AppScreenView>
      <AppScrollView contentContainerStyle={{ gap: 8 }}>
        <AppView style={{ marginVertical: 16, marginTop: 24 }}>
          <AppText variant="headingMedium" style={{ textAlign: "center" }}>
            Settings
          </AppText>
        </AppView>

        {/* User Profile */}
        <UserProfile />

        {/* Settings */}
        <AppView style={{ marginTop: 16 }}>
          <Settings />
        </AppView>
      </AppScrollView>

      {/* Verification Form Sheet */}
      <BottomSheet
        enablePanDownToClose={false}
        topInset={insets.top}
        bottomInset={insets.bottom}
        keyboardBlurBehavior="restore"
        backdropComponent={renderAppSheetBackdrop}
        animationConfigs={{
          duration: 380,
        }}
        handleStyle={{
          borderBottomWidth: 1,
          borderColor: theme.border.primary,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.text.muted,
          width: 48,
          height: 4,
          borderRadius: 4,
        }}
        backgroundStyle={{
          backgroundColor: theme.background.secondary,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 8,
        }}
        containerStyle={StyleSheet.absoluteFill}
      >
        <BottomSheetView
          style={{
            backgroundColor: theme.background.secondary,
            padding: SCREEN_PADDING,
            paddingTop: 0,
          }}
        >
          <AppView style={{ alignItems: "center", marginVertical: 16 }}>
            <AppText variant="headingSmall" weight="600">
              Verify Your Identity
            </AppText>
          </AppView>
          <PasswordInput
            value={password}
            onChangeText={handlePasswordChange}
            onSubmitEditing={handleOnSubmit}
            hasError={!!error}
          />
          {!!error && (
            <AppView
              style={[
                styles.error,
                { backgroundColor: theme.background.secondary },
              ]}
            >
              <AppText
                variant="bodySmall"
                style={{ color: theme.status.danger }}
              >
                {error}
              </AppText>
            </AppView>
          )}
          <AppPressable
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
            <AppText
              variant="button"
              color="inverse"
              style={{ flex: 1, textAlign: "center" }}
            >
              Verify
            </AppText>
          </AppPressable>
        </BottomSheetView>
      </BottomSheet>
    </AppScreenView>
  );
}

function renderAppSheetBackdrop(props: Readonly<BottomSheetBackdropProps>) {
  return (
    <BottomSheetBackdrop
      {...props}
      pressBehavior="none"
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.5}
    />
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
