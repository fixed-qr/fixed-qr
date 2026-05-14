import { Transaction } from "@/components";
import { Image, ThemedText, ThemedView, UIBottomSheet } from "@/components/ui";
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
    <UIBottomSheet
      title="Transactions"
      ref={ref}
      index={-1}
      snapPoints={["50%", "75%"]}
      enablePanDownToClose={true}
    >
      <BottomSheetScrollView
        style={{
          backgroundColor: theme.background.secondary,
          paddingHorizontal: 20,
        }}
      >
        {transactions.length ? (
          <ThemedView
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
          </ThemedView>
        ) : (
          <ThemedView
            style={[
              styles.transactionEmpty,
              {
                backgroundColor: theme.background.secondary,
                borderColor: theme.border.primary,
              },
            ]}
          >
            <Image
              source={require("@/assets/images/icons/not-found.png")}
              style={styles.notFoundImage}
            />
            <ThemedText
              variant="small"
              style={[styles.emptyText, { color: theme.text.secondary }]}
            >
              Your recent transactions will appear here.
            </ThemedText>
          </ThemedView>
        )}
      </BottomSheetScrollView>
    </UIBottomSheet>
  );
}

const styles = StyleSheet.create({
  transactionsTitle: {
    marginTop: 16,
    paddingInline: 8,
  },
  transactions: {
    flex: 1,
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 28,
  },
  transactionEmpty: {
    marginTop: 8,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    borderRadius: 24,
    borderWidth: 1,
  },
  notFoundImage: {
    objectFit: "contain",
    width: 120,
    height: 120,
  },
  emptyText: {
    textAlign: "center",
  },
});
