import { EmptyCard, QuickAction } from "@/components";
import { AppText, AppView } from "@/components/app-ui";
import { screenWidth } from "@/constants/dimensions";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { getProviderLabel } from "@/utils/get-provider-label";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { Link } from "expo-router";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

const gap = 8;
const width = (screenWidth - gap - 40 - 1) / 2;

export function QuickActionSection() {
  const theme = useTheme();
  const transactions = useDataStore((state) => state.transactions);

  const suggestedTransactions = useMemo(() => {
    const seen = new Set<string>();

    return transactions.filter((transaction) => {
      const key = `${transaction.amount}-${transaction.provider}`;

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);

      return true;
    });
  }, [transactions]).slice(0, 4);

  return (
    <AppView>
      <AppText
        variant="bodyMedium"
        color="tertiary"
        weight="600"
        style={styles.quickActionsTitle}
      >
        Quick Actions
      </AppText>
      {suggestedTransactions.length ? (
        <AppView style={[styles.quickActions]}>
          {suggestedTransactions.map((tsx) => (
            <Link
              key={tsx.transactionId}
              href={{
                pathname: "/(modals)/qr-code/result",
                params: {
                  upiId: tsx.upiId,
                  amount: tsx.amount,
                  provider: tsx.provider,
                },
              }}
            >
              <QuickAction
                logoImage={getProviderLogo(tsx.provider)}
                label={getProviderLabel(tsx.provider)}
                amount={tsx.amount}
                size={width}
              />
            </Link>
          ))}
        </AppView>
      ) : (
        <AppView
          style={{
            borderWidth: 1,
            borderColor: theme.border.primary,
            borderRadius: 24,
            marginTop: 8,
          }}
        >
          <EmptyCard message="Your quick actions will appear here." />
        </AppView>
      )}
    </AppView>
  );
}

const styles = StyleSheet.create({
  quickActionsTitle: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  quickActions: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
  },
});
