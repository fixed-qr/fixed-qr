import { useTheme } from "@/hooks/use-theme";
import { useStore } from "@/store/useStore";
import { getProviderLabel } from "@/utils/get-provider-label";
import { getProviderLogo } from "@/utils/get-provider-logo";
import React from "react";
import { StyleSheet } from "react-native";
import { Transaction } from "../transaction";
import { Image, ThemedText, ThemedView } from "../ui";

const data = [1, 2, 3];

export function Transactions() {
  const theme = useTheme();
  const transactions = useStore((state) => state.transactions);

  return (
    <ThemedView>
      <ThemedText style={styles.transactionsTitle}>Transactions</ThemedText>
      {transactions.length ? (
        <ThemedView
          style={[
            styles.transactions,
            { backgroundColor: theme.backgroundElement },
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
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
            },
          ]}
        >
          <Image
            source={require("@/assets/images/icons/not-found.png")}
            style={styles.notFoundImage}
          />
          <ThemedText
            type="small"
            themeColor="textSecondary"
            style={styles.emptyText}
          >
            Your recent transactions will appear here.
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
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
    overflow: "hidden",
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
