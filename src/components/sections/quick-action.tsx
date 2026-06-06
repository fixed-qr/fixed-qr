import { Amount, EmptyCard } from "@/components";
import { AppIcon, AppImage, AppText, AppView } from "@/components/app-ui";
import { screenWidth } from "@/constants/dimensions";
import { upiAppLogo } from "@/constants/upi-app-logo";
import { useTheme } from "@/hooks/use-theme";
import { useSavedUpiAppStore } from "@/store/saved-upi-app-store";
import { useTransactionStore } from "@/store/transaction-store";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";

const gap = 8;
const width = (screenWidth - gap - 40 - 1) / 2;

export function QuickActionSection() {
  const theme = useTheme();
  const router = useRouter();
  const transactions = useTransactionStore((state) => state.transactions);
  const savedUpiApps = useSavedUpiAppStore((state) => state.savedUpiApps);

  const suggestedTransactions = useMemo(() => {
    const seen = new Set<string>();

    return transactions.filter((transaction) => {
      const key = `${transaction.amount}-${transaction.appName}`;

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
            <Pressable
              key={tsx.id}
              onPress={() => {
                router.push({
                  pathname: "/(protected)/(modals)/qr-code/result",
                  params: {
                    upiId: savedUpiApps[tsx.appName]?.upiId,
                    amount: tsx.amount,
                    appName: tsx.appName,
                  },
                });
              }}
              style={({ pressed }) => [
                styles.quickAction,
                {
                  backgroundColor: pressed
                    ? theme.background.tertiary
                    : theme.background.card,
                  borderColor: pressed
                    ? theme.border.focus
                    : theme.border.primary,
                  width: width,
                  height: width / 1.25,
                },
              ]}
            >
              <AppImage
                source={upiAppLogo[tsx.appName]}
                style={styles.logoImage}
              />
              <Amount value={tsx.amount} />
              <AppView style={styles.provider}>
                <AppText variant="bodyMedium" color="secondary">
                  {tsx.appName}
                </AppText>
                <AppIcon
                  name="arrow-forward"
                  size={16}
                  style={{ transform: "rotate(-45deg)" }}
                  color={theme.text.secondary}
                />
              </AppView>
            </Pressable>
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
  quickAction: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 28,
  },
  logoImage: {
    width: 36,
    height: 36,
    marginBottom: 6,
  },
  provider: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
});
