import { AppIcon, AppText } from "@/components/app-ui";
import { useHistoryStore } from "@/features/history/store";
import { useIdentityVerificationStore } from "@/features/identity-verification/store";
import { useSavedUpiAppStore } from "@/features/saved-upi-app/store";
import { useSheet } from "@/features/sheets/use-sheet";
import { useUserStore } from "@/features/user/store";
import { useTheme } from "@/hooks/use-theme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { AlertModal } from "./alert-modal";
import { Section } from "./section";

export function Settings() {
  const theme = useTheme();
  const router = useRouter();
  const sheet = useSheet();

  const [showAlert, setShowAlert] = useState(false);
  const [pressed, setPressed] = useState<{
    deleteAccount: boolean;
    transactions: boolean;
  }>({ deleteAccount: false, transactions: false });

  const resetIdentity = useIdentityVerificationStore(
    (state) => state.verifyIdentity,
  );
  const removeUser = useUserStore((state) => state.removeUser);
  const clearUpiApps = useSavedUpiAppStore((state) => state.clearUpiApps);
  const clearHistories = useHistoryStore((state) => state.clearHistories);

  const handelOnPress = () => {
    removeUser();
    clearUpiApps();
    clearHistories();
    resetIdentity();
    router.replace("/(auth)/get-started");
  };

  const onPressColor = (state: boolean) => {
    return state ? theme.text.tertiary : theme.text.primary;
  };

  return (
    <Section>
      {/* Delete account button */}
      <Pressable
        onPress={() => setShowAlert(true)}
        onPressIn={() => setPressed({ ...pressed, deleteAccount: true })}
        onPressOut={() => setPressed({ ...pressed, deleteAccount: false })}
        style={[
          styles.setting,
          {
            borderColor: theme.border.primary,
            borderBottomWidth: 1,
          },
        ]}
      >
        <AppIcon
          name="trash"
          size={18}
          color={onPressColor(pressed.deleteAccount)}
        />
        <AppText
          variant="button"
          style={{ color: onPressColor(pressed.deleteAccount) }}
        >
          Delete Account
        </AppText>
        <AppIcon
          name={"arrow-forward"}
          size={18}
          color={onPressColor(pressed.deleteAccount)}
          style={{ marginLeft: "auto" }}
        />
      </Pressable>

      {/* Delete account confirmation */}
      <AlertModal
        visible={showAlert}
        title="Delete Account"
        message="This will permanently delete your account and all associated data."
        onCancel={() => setShowAlert(false)}
        onConfirm={() => {
          handelOnPress();
          setShowAlert(false);
        }}
      />

      {/* History */}
      <Pressable
        onPress={() => {
          sheet.push("HistorySheet", {});
        }}
        onPressIn={() => setPressed({ ...pressed, transactions: true })}
        onPressOut={() => setPressed({ ...pressed, transactions: false })}
        style={[
          styles.setting,
          {
            borderColor: theme.border.primary,
            borderBottomWidth: 0,
          },
        ]}
      >
        <AppIcon
          name="snow"
          size={18}
          color={onPressColor(pressed.transactions)}
        />
        <AppText
          variant="button"
          style={{ color: onPressColor(pressed.transactions) }}
        >
          History
        </AppText>
        <AppIcon
          name={"arrow-forward"}
          size={18}
          color={onPressColor(pressed.transactions)}
          style={{ marginLeft: "auto" }}
        />
      </Pressable>
    </Section>
  );
}

const styles = StyleSheet.create({
  setting: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
  },
});
