import { PasswordInput } from "@/components";
import { AppPressable, AppText, AppView } from "@/components/app-ui";
import { SCREEN_PADDING } from "@/constants/screen";
import { useTheme } from "@/hooks/use-theme";
import { useUserStore } from "@/store/user-store";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { usePathname } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";
import { useIdentityVerificationStore } from "../store";

export default function IdentityVerification() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheet>(null);
  const isSheetOpen = useRef(false);

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { isSessionValid, verifyIdentity } = useIdentityVerificationStore(
    useShallow((state) => state),
  );
  const storedPassword = useUserStore((state) => state.user?.password);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/profile" && !isSessionValid()) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.forceClose();
    }
  }, [pathname, isSessionValid]);

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
    sheetRef.current?.forceClose();
    Keyboard.dismiss();
  };

  return (
    <BottomSheet
      ref={sheetRef}
      enablePanDownToClose={false}
      topInset={insets.top}
      bottomInset={insets.bottom}
      keyboardBlurBehavior="restore"
      backdropComponent={renderAppSheetBackdrop}
      onChange={(index) => {
        isSheetOpen.current = index !== -1;
      }}
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
            <AppText variant="bodySmall" style={{ color: theme.status.danger }}>
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
  );
}

function renderAppSheetBackdrop(props: Readonly<BottomSheetBackdropProps>) {
  return (
    <BottomSheetBackdrop
      {...props}
      pressBehavior={"none"}
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
