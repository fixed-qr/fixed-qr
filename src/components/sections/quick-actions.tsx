import { screenWidth } from "@/constants/dimensions";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { getProviderLabel } from "@/utils/get-provider-label";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { QuickAction } from "../quick-action";
import { AppImage, AppText, AppView } from "../ui";

const gap = 8;
const width = (screenWidth - gap - 40 - 1) / 2;

export function QuickActions() {
  const theme = useTheme();
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
            variant="bodyMedium"
            color="secondary"
            style={styles.emptyText}
          >
            Your quick actions will appear here.
          </AppText>
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
