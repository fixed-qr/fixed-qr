import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useStore } from "@/store/useStore";
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
  const removeUpiId = useStore((state) => state.removeUpiId);

  return (
    <ThemedView
      style={[
        styles.upiId,
        { borderColor: theme.background, borderBottomWidth: isLast ? 0 : 1 },
      ]}
    >
      <ThemedView style={styles.left}>
        <ThemedView style={styles.logo}>
          <Image source={logoImage} style={styles.logoImage} />
        </ThemedView>
        <ThemedView style={styles.upiIdInfo}>
          <ThemedText>{label}</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {upiId}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.right}>
        <Pressable onPress={() => removeUpiId(upiId)}>
          <Ionicons name="close" size={24} color={theme.textSecondary} />
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
  right: {
    backgroundColor: "transparent",
  },
  logo: {
    backgroundColor: "transparent",
  },
  logoImage: {
    width: 24,
    height: 24,
  },
  upiIdInfo: {
    backgroundColor: "transparent",
  },
});
