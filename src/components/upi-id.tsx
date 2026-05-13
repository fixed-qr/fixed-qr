import { spacing } from "@/constants/themex";
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
        styles.shared,
        styles.upiId,
        {
          borderColor: theme.background.primary,
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
    >
      <ThemedView style={[styles.shared, styles.left]}>
        <Image source={logoImage} style={styles.logoImage} />
        <ThemedView style={[styles.shared, styles.upiIdInfo]}>
          <ThemedText>{label}</ThemedText>
          <ThemedText variant="small" style={{ color: theme.text.primary }}>
            {upiId}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={[styles.shared, styles.right]}>
        <Pressable onPress={() => handleRemoveUpiId(upiId)}>
          <Ionicons name="close" size={18} color={theme.text.primary} />
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  shared: {
    backgroundColor: "transparent",
  },
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
    gap: spacing[8],
  },
  right: {},
  logoImage: {
    width: 24,
    height: 24,
  },
  upiIdInfo: {},
});
