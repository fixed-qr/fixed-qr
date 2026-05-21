import { AppIcon, AppImage, AppText } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { ImageSourcePropType, Pressable, StyleSheet } from "react-native";

interface ProviderButtonProps {
  label: string;
  logoImage: ImageSourcePropType;
  onPress: () => void;
  isSelected: boolean;
  size?: number | "auto";
}

export function ProviderButton({
  label,
  logoImage,
  onPress,
  isSelected,
  size,
}: ProviderButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.provider,
        {
          width: size,
          borderColor: theme.border.primary,
          backgroundColor: isSelected
            ? theme.background.cardMuted
            : theme.background.card,
        },
      ]}
    >
      <AppImage source={logoImage} style={styles.logoImage} />
      <AppText variant="bodyMedium" style={styles.label}>
        {label}
      </AppText>
      {isSelected && (
        <AppIcon
          name="checkmark-done"
          size={20}
          style={[styles.checkmarkDone, { color: theme.status.info }]}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  provider: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    padding: 8,
    paddingVertical: 16,
    position: "relative",
  },
  logoImage: {
    width: 38,
    height: 38,
  },
  label: {
    textAlign: "center",
  },
  checkmarkDone: {
    position: "absolute",
    top: 2,
    right: 2,
    padding: 4,
    borderRadius: 99,
  },
});
