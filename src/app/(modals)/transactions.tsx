import { Transaction } from "@/components";
import { Image, ScrollView, ThemedText, ThemedView } from "@/components/ui";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { getProviderLabel } from "@/utils/get-provider-label";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { StyleSheet } from "react-native";

export default function TransactionsScreen() {
  const theme = useTheme();
  const transactions = useDataStore((state) => state.transactions);

  return (
    <ScrollView>
      <ThemedText style={styles.title}>All Transactions</ThemedText>
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
            color="textSecondary"
            style={styles.emptyText}
          >
            Your recent transactions will appear here.
          </ThemedText>
        </ThemedView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 22,
    marginVertical: 16,
  },
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
