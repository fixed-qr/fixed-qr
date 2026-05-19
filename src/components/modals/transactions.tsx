import { EmptyCard, Transaction } from "@/components";
import { AppBottomSheet, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { getProviderLabel } from "@/utils/get-provider-label";
import { getProviderLogo } from "@/utils/get-provider-logo";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet/src";
import React, { Ref } from "react";
import { StyleSheet } from "react-native";

interface TransactionsProps {
  ref?: Ref<BottomSheet>;
}

export function Transactions({ ref }: TransactionsProps) {
  const theme = useTheme();
  const transactions = useDataStore((state) => state.transactions);

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
      >
        {transactions.length ? (
          <AppView
            style={[
              styles.transactions,
              { backgroundColor: theme.background.card },
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
    borderRadius: 28,
  },
});
