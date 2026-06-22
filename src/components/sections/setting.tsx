import { AppIcon, AppText } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useIdentityStore } from "@/store/identity-store";
import { useSavedUpiAppStore } from "@/store/saved-upi-app-store";
import { useTransactionStore } from "@/store/transaction-store";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { AlertModal } from "../alert-modal";
import { Section } from "../section";

export function SettingSection() {
  const theme = useTheme();
  const [pressed, setPressed] = useState<{
    deleteAccount: boolean;
    transactions: boolean;
  }>({ deleteAccount: false, transactions: false });
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const resetIdentity = useIdentityStore((state) => state.verifyIdentity);
  const removeUser = useUserStore((state) => state.removeUser);
  const clearUpiApps = useSavedUpiAppStore((state) => state.clearUpiApps);
  const clearTransactions = useTransactionStore(
    (state) => state.clearTransactions,
  );

  const handelOnPress = () => {
    removeUser();
    clearUpiApps();
    clearTransactions();
    resetIdentity();
    router.replace("/(auth)/get-started");
  };

  const onPressColor = (state: boolean) => {
    return state ? theme.text.tertiary : theme.text.primary;
  };

  return (
    <Section title="Settings">
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

      {/* Transactions */}
      <Pressable
        onPress={() => {
          router.push("/(protected)/sheets/transaction");
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
          Transactions
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
