import { screenWidth } from "@/constants/dimensions";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useStore } from "@/store/useStore";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { Link } from "expo-router";
import { Image, StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "./ui";

const gap = spacing[8];
const width = (screenWidth - gap - 40 - 1) / 2;

export function RecentTransactionSection() {
  const theme = useTheme();
  const transactions = useStore((state) => state.transactions);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="smallBold" style={[{ color: theme.textSecondary }]}>
        Recent Transactions
      </ThemedText>
      {transactions.length ? (
        <ThemedView style={[styles.cardContainer]}>
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
              <ThemedView
                style={[
                  styles.card,
                  { backgroundColor: theme.card, borderColor: theme.border },
                ]}
              >
                <ThemedView style={styles.rupeeContainer}>
                  <Image
                    source={require("@/assets/images/icons/rupee-64.png")}
                    style={[styles.rupeeUintImage, { tintColor: theme.text }]}
                  />
                  <ThemedText style={styles.amountText}>
                    {tsx.amount}
                  </ThemedText>
                </ThemedView>
                <ThemedView style={styles.logoContainer}>
                  <Image
                    source={getProviderLogo(tsx.provider)}
                    style={styles.image}
                  />
                </ThemedView>
              </ThemedView>
            </Link>
          ))}
        </ThemedView>
      ) : (
        <ThemedView
          style={[
            styles.recentTransactionEmpty,
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
            You don't have recent transactions yet.
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing[20],
  },
  cardContainer: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
  },
  card: {
    width: width,
    height: width,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: gap,
    borderRadius: 24,
    borderWidth: 1,
  },
  rupeeContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rupeeUintImage: {
    height: 15.5,
    width: 15.5,
  },
  amountText: {
    fontSize: 22,
  },
  logoContainer: {
    position: "absolute",
    height: 28,
    width: 28,
    bottom: 8,
    left: 8,
    backgroundColor: "transparent",
  },
  image: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  recentTransactionEmpty: {
    marginTop: 16,
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
