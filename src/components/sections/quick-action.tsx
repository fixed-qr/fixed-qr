import { EmptyCard, QuickAction } from "@/components";
import { AppText, AppView } from "@/components/app-ui";
import { screenWidth } from "@/constants/dimensions";
import { useDataStore } from "@/store/data-store";
import { getProviderLabel } from "@/utils/get-provider-label";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

const gap = 8;
const width = (screenWidth - gap - 40 - 1) / 2;

export function QuickActionSection() {
  const transactions = useDataStore((state) => state.transactions);

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
      {transactions.length ? (
        <AppView style={[styles.quickActions]}>
          {Array.from(
            new Map(transactions.map((item) => [item.amount, item])).values(),
          )
            .slice(0, 6)
            .map((tsx) => (
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
        <EmptyCard message="Your quick actions will appear here." />
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
