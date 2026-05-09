import { spacing } from "@/constants/theme";
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

  return (
    <ThemedView
      style={[
        styles.upiId,
        styles.shared,
        { borderColor: theme.background, borderBottomWidth: isLast ? 0 : 1 },
      ]}
    >
      <ThemedView style={[styles.left, styles.shared]}>
        <Image source={logoImage} style={styles.logoImage} />
        <ThemedView style={[styles.upiIdInfo, styles.shared]}>
          <ThemedText>{label}</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {upiId}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={[styles.right, styles.shared]}>
        <Pressable onPress={() => removeUpiId(upiId)}>
          <Ionicons name="close" size={18} color={theme.textSecondary} />
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
    paddingBlock: 4,
    paddingInline: 12,
    borderBottomWidth: 1.5,
    backgroundColor: "transparent",
  },
  left: {
    flex: 1,
    flexDirection: "row",
    gap: spacing[8],
    backgroundColor: "transparent",
  },
  right: {},
  logoImage: {
    width: 24,
    height: 24,
  },
  upiIdInfo: {},
});
