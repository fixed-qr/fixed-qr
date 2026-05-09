import { useTheme } from "@/hooks/use-theme";
import { ImageSourcePropType, Pressable, StyleSheet } from "react-native";
import { Image, Ionicons, ThemedText } from "./ui";

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
          borderColor: theme.border,
          backgroundColor: isSelected
            ? theme.backgroundSelected
            : "transparent",
        },
      ]}
    >
      <Image source={logoImage} style={styles.logoImage} />
      <ThemedText style={styles.label}>{label}</ThemedText>
      {isSelected && (
        <Ionicons
          name="checkmark-done"
          size={18}
          style={[styles.checkmarkDone, { color: theme.info }]}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  provider: {
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: 8,
    borderRadius: 24,
    borderWidth: 1,
    position: "relative",
  },
  logoImage: {
    width: 38,
    height: 38,
  },
  label: {
    textAlign: "center",
    fontSize: 14,
  },
  checkmarkDone: {
    position: "absolute",
    top: 6,
    right: 6,
    padding: 4,
    borderRadius: 99,
  },
});
