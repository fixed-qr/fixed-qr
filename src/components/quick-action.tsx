import { spacing } from "@/constants/themex";
import { useTheme } from "@/hooks/use-theme";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { Amount } from "./amount";
import { Image, Ionicons, ThemedText, ThemedView } from "./ui";

interface QuickActionProps {
  logoImage: ImageSourcePropType;
  label: string;
  amount: string;
  size: number;
}

export function QuickAction({
  logoImage,
  label,
  amount,
  size,
}: QuickActionProps) {
  const theme = useTheme();

  return (
    <ThemedView
      style={[
        styles.quickAction,
        {
          backgroundColor: theme.background.secondary,
          borderColor: theme.border.primary,
          width: size,
          height: size / 1.25,
        },
      ]}
    >
      <Image source={logoImage} style={styles.logoImage} />
      <Amount amount={amount} />
      <ThemedView style={styles.provider}>
        <ThemedText
          variant="small"
          style={[styles.providerText, { color: theme.text.secondary }]}
        >
          {label}
        </ThemedText>
        <Ionicons
          name="arrow-forward"
          size={16}
          style={{ transform: "rotate(-45deg)" }}
          color={theme.text.secondary}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  quickAction: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 28,
  },
  logoImage: {
    width: 36,
    height: 36,
    marginBottom: "auto",
  },
  provider: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  providerText: {},
});
