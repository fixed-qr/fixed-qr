import { screenWidth } from "@/constants/dimensions";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Link } from "expo-router";
import { Image, StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "./ui";

const gap = spacing[8];
const width = (screenWidth - gap * 3 - 40) / 3;

export function RecentSection() {
  const theme = useTheme();
  return (
    <ThemedView style={styles.container}>
      {/* Card Title */}
      <ThemedText type="smallBold" style={[{ color: theme.textSecondary }]}>
        Recent
      </ThemedText>
      {/* Cards */}
      <ThemedView style={[styles.cardContainer]}>
        <Link
          href={{
            pathname: "/(modals)/qr-code/result",
            params: { amount: 255, upiId: "6299453306@axi" },
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
              <ThemedText style={styles.amountText}>255</ThemedText>
            </ThemedView>
            <ThemedView style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/logo/google-pay.png")}
                style={styles.image}
              />
            </ThemedView>
          </ThemedView>
        </Link>
      </ThemedView>
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
});
