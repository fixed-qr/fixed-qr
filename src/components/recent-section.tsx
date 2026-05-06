import { screenWidth } from "@/constants/dimensions";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useStore } from "@/store/useStore";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { Link } from "expo-router";
import { Image, StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "./ui";

const gap = spacing[8];
const width = (screenWidth - gap * 3 - 40) / 3;

export function RecentSection() {
  const theme = useTheme();
  const transactions = useStore((state) => state.transactions);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="smallBold" style={[{ color: theme.textSecondary }]}>
        Recent
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
        <ThemedView style={styles.recentTransactionEmpty}>
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
    marginTop: spacing[12],
  },
  cardContainer: {
    marginTop: gap,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
  },
  card: {
    width: width,
    height: width,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: gap,
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
    paddingHorizontal: 16,
  },
  emptyText: {
    textAlign: "center",
    paddingVertical: 32,
  },
});
