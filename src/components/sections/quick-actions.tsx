import { screenWidth } from "@/constants/dimensions";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { getProviderLabel } from "@/utils/get-provider-label";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { QuickAction } from "../quick-action";
import { Image, ThemedText, ThemedView } from "../ui";

const gap = spacing[8];
const width = (screenWidth - gap - 40 - 1) / 2;

export function QuickActions() {
  const theme = useTheme();
  const transactions = useDataStore((state) => state.transactions);

  return (
    <ThemedView>
      <ThemedText
        type="smallBold"
        style={[styles.quickActionsTitle, { color: theme.textSecondary }]}
      >
        Quick Actions
      </ThemedText>
      {transactions.length ? (
        <ThemedView style={[styles.quickActions]}>
          {Array.from(
            new Map(transactions.map((item) => [item.amount, item])).values(),
          ).map((tsx) => (
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  quickActionsTitle: {
    marginTop: 16,
    paddingInline: 8,
  },
  quickActions: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
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
