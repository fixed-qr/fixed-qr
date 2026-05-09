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
        styles.shared,
        styles.transaction,
        { borderColor: theme.background, borderBottomWidth: isLast ? 0 : 1 },
      ]}
    >
      <ThemedView style={[styles.shared, styles.left]}>
        <Image source={logoImage} style={styles.logoImage} />
      </ThemedView>
      <ThemedView style={[styles.shared, styles.right]}>
        <ThemedView style={[styles.rightLeft, styles.shared]}>
          <ThemedText>{label}</ThemedText>
          <ThemedText type="small" color="textSecondary">
            {timestamp}
          </ThemedText>
        </ThemedView>
        <ThemedView style={[styles.shared, styles.rightRight]}>
          <Amount amount={amount} size={12} />
          <Ionicons
            name="arrow-back"
            size={18}
            color={theme.text}
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
    paddingBlock: 4,
    paddingInline: 12,
    borderBottomWidth: 1.5,
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
