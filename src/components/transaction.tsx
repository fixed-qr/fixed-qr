import { useTheme } from "@/hooks/use-theme";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { Amount } from "./amount";
import { Image, Ionicons, ThemedText, ThemedView } from "./ui";

interface TransactionProps {
  logoImage: ImageSourcePropType;
  label: string;
  timestamp: string;
  amount: string;
  isLast: boolean;
}

export function Transaction({
  logoImage,
  label,
  timestamp,
  amount,
  isLast,
}: TransactionProps) {
  const theme = useTheme();

  return (
    <ThemedView
      style={[
        styles.transaction,
        styles.shared,
        { borderColor: theme.background, borderBottomWidth: isLast ? 0 : 1 },
      ]}
    >
      <ThemedView style={[styles.left, styles.shared]}>
        <Image source={logoImage} style={styles.logoImage} />
      </ThemedView>
      <ThemedView style={[styles.right, styles.shared]}>
        <ThemedView style={[styles.rightLeft, styles.shared]}>
          <ThemedText>{label}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {timestamp}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.rightRight, styles.shared]}>
          <Amount amount={amount} size={12} />
          <Ionicons
            name="arrow-back"
            size={18}
            style={{ transform: "rotate(-45deg)" }}
          />
        </ThemedView>
      </ThemedView>
      <Ionicons
        name="information-circle"
        size={18}
        color={theme.textSecondary}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  shared: {
    backgroundColor: "transparent",
  },
  transaction: {
    flexDirection: "row",
    padding: 8,
    gap: 8,
  },
  left: {},
  right: {
    flex: 1,
    flexDirection: "row",
  },
  logoImage: {
    width: 24,
    height: 24,
  },
  rightLeft: {
    flex: 1,
  },
  rightRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
