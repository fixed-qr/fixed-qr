import { EmptyCard, Transaction } from "@/components";
import { AppBottomSheet, AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { useUserDataStore } from "@/store/user-data-store";
import { getProviderLabel } from "@/utils/get-provider-label";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet/src";
import React from "react";
import { StyleSheet } from "react-native";

export function TransactionBottomSheet() {
  const theme = useTheme();
  const ref = useBottomSheetStore((state) =>
    state.register("transaction-sheet"),
  );
  const transactions = useUserDataStore((state) => state.transactions);

  return (
    <AppBottomSheet
      ref={ref}
      index={-1}
      snapPoints={["50%", "75%", "90%"]}
      enablePanDownToClose={true}
    >
      <BottomSheetScrollView
        style={{
          backgroundColor: theme.background.secondary,
        }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        <AppView style={{ alignItems: "center", marginBottom: 16 }}>
          <AppText variant="headingSmall" weight="600">
            Transactions
          </AppText>
        </AppView>
        {transactions.length ? (
          <AppView
            style={[
              styles.transactions,
              {
                backgroundColor: theme.background.card,
                borderColor: theme.border.primary,
              },
            ]}
          >
            {transactions.map((tsx, index) => (
              <Transaction
                key={tsx.transactionId + index}
                logoImage={getProviderLogo(tsx.provider)}
                label={getProviderLabel(tsx.provider)}
                timestamp={tsx.date}
                amount={tsx.amount}
                isLast={index === transactions.length - 1}
              />
            ))}
          </AppView>
        ) : (
          <EmptyCard message="Your recent transactions will appear here." />
        )}
      </BottomSheetScrollView>
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    width: "100%",
    minWidth: "100%",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  transactions: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
  },
});
