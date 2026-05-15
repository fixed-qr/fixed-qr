import { Transaction } from "@/components";
import { AppBottomSheet, AppImage, AppText, AppView } from "@/components/ui";
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
          <AppView
            style={[
              styles.transactionEmpty,
              {
                backgroundColor: theme.background.secondary,
                borderColor: theme.border.primary,
              },
            ]}
          >
            <AppImage
              source={require("@/assets/images/icons/not-found.png")}
              style={styles.notFoundImage}
            />
            <AppText
              variant="bodySmall"
              style={[styles.emptyText, { color: theme.text.secondary }]}
            >
              Your recent transactions will appear here.
            </AppText>
          </AppView>
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
