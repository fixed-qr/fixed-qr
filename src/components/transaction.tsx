import { AppIcon, AppImage, AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { Amount } from "./amount";

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
    <AppView
      style={[
        styles.shared,
        styles.transaction,
        {
          borderColor: theme.background.secondary,
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
    >
      <AppView style={[styles.shared, styles.left]}>
        <AppImage source={logoImage} style={styles.logoImage} />
      </AppView>
      <AppView style={[styles.shared, styles.right]}>
        <AppView style={[styles.rightLeft, styles.shared]}>
          <AppText variant="button">{label}</AppText>
          <AppText variant="bodySmall" color="tertiary">
            {timestamp}
          </AppText>
        </AppView>
        <AppView style={[styles.shared, styles.rightRight]}>
          <Amount value={amount} size={10} />
          <AppIcon
            name="arrow-back"
            size={18}
            color={theme.text.primary}
            style={{ transform: "rotate(-45deg)" }}
          />
        </AppView>
      </AppView>
      <AppIcon
        name="information-circle"
        size={18}
        color={theme.text.secondary}
      />
    </AppView>
  );
}

const styles = StyleSheet.create({
  shared: {
    backgroundColor: "transparent",
  },
  transaction: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
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
    gap: 4,
  },
  rightRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
