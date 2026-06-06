import { AppGroup, AppIcon, AppText } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { useIdentityStore } from "@/store/identity-store";
import { useTransactionStore } from "@/store/transaction-store";
import { useUserStore } from "@/store/user-store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";

export function SettingSection() {
  const theme = useTheme();
  const snapToIndex = useBottomSheetStore((state) => state.snapToIndex);
  const [pressed, setPressed] = useState<{
    deleteAccount: boolean;
    transactions: boolean;
  }>({ deleteAccount: false, transactions: false });
  const router = useRouter();
  const resetIdentity = useIdentityStore((state) => state.verifyIdentity);
  const removeUser = useUserStore((state) => state.removeUser);
  const clearTransactions = useTransactionStore(
    (state) => state.clearTransactions,
  );

  const handelOnPress = () => {
    Alert.alert(
      "Delete Account",
      "This will permanently delete your account and all associated data. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete Account",
          style: "destructive",
          onPress: () => {
            removeUser();
            clearTransactions();
            resetIdentity();
            router.replace("/(auth)/get-started");
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const onPressColor = (state: boolean) => {
    return state ? theme.text.tertiary : theme.text.primary;
  };

  return (
    <AppGroup title="Settings">
      <Pressable
        onPress={handelOnPress}
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
      <Pressable
        onPress={() => {
          snapToIndex("TRANSACTION", 0);
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
    </AppGroup>
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
