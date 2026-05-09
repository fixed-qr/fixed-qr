import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useAuthStore } from "@/store/auth-store";
import { useDataStore } from "@/store/data-store";
import { useRouter } from "expo-router";
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
  const router = useRouter();
  const removeUpiId = useDataStore((state) => state.removeUpiId);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleRemoveUpiId = (upiId: string) => {
    if (isAuthenticated) {
      removeUpiId(upiId);
    } else {
      router.navigate("/(modals)/authenticate");
    }
  };

  return (
    <ThemedView
      style={[
        styles.shared,
        styles.upiId,
        { borderColor: theme.background, borderBottomWidth: isLast ? 0 : 1 },
      ]}
    >
      <ThemedView style={[styles.shared, styles.left]}>
        <Image source={logoImage} style={styles.logoImage} />
        <ThemedView style={[styles.shared, styles.upiIdInfo]}>
          <ThemedText>{label}</ThemedText>
          <ThemedText type="small" style={{ color: theme.textSecondary }}>
            {upiId}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <ThemedView style={[styles.shared, styles.right]}>
        <Pressable onPress={() => handleRemoveUpiId(upiId)}>
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
