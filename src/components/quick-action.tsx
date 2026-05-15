import { AppIcon, AppImage, AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { Amount } from "./amount";

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
    <AppView
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
      <AppImage source={logoImage} style={styles.logoImage} />
      <Amount amount={amount} />
      <AppView style={styles.provider}>
        <AppText variant="bodyMedium" color="secondary">
          {label}
        </AppText>
        <AppIcon
          name="arrow-forward"
          size={16}
          style={{ transform: "rotate(-45deg)" }}
          color={theme.text.secondary}
        />
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  quickAction: {
    padding: 16,
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
    gap: 2,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
});
