import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
} from "react-native";
import { Ionicons, ThemedText, ThemedView } from "./ui";

interface UpiIdProps {
  logoImage: ImageSourcePropType;
  label: string;
  upiId: string;
  isLast: boolean;
}

export function UpiId({ logoImage, label, upiId, isLast }: UpiIdProps) {
  const theme = useTheme();
  const removeUpiId = useDataStore((state) => state.removeUpiId);

  const handleRemoveUpiId = (upiId: string) => {
    removeUpiId(upiId);
  };

  return (
    <ThemedView
      style={[
        styles.upiId,
        {
          borderColor: theme.background.primary,
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
    >
      <ThemedView style={styles.left}>
        <Image source={logoImage} style={styles.logoImage} />
        <ThemedView style={styles.upiIdInfo}>
          <ThemedText variant="button">{label}</ThemedText>
          <ThemedText variant="bodySmall" color="tertiary">
            {upiId}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.right}>
        <Pressable onPress={() => handleRemoveUpiId(upiId)}>
          <Ionicons name="close" size={18} color={theme.text.primary} />
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  upiId: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1.5,
  },
  left: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  right: {},
  logoImage: {
    width: 24,
    height: 24,
  },
  upiIdInfo: {
    gap: 2,
  },
});
