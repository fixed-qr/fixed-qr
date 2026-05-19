import { AppIcon, AppText, AppView } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import {
    Image,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
} from "react-native";

interface UpiIdProps {
  logoImage: ImageSourcePropType;
  label: string;
  upiId: string;
  isLast?: boolean;
}

export function UpiId({ logoImage, label, upiId, isLast }: UpiIdProps) {
  const theme = useTheme();
  const removeUpiId = useDataStore((state) => state.removeUpiId);

  const handleRemoveUpiId = (upiId: string) => {
    removeUpiId(upiId);
  };

  return (
    <AppView
      style={[
        styles.upiId,
        {
          borderColor: theme.border.primary,
          borderBottomWidth: isLast ? 0 : 1,
        },
      ]}
    >
      <AppView style={styles.left}>
        <Image source={logoImage} style={styles.logoImage} />
        <AppView style={styles.upiIdInfo}>
          <AppText variant="button">{label}</AppText>
          <AppText variant="bodySmall" color="tertiary">
            {upiId}
          </AppText>
        </AppView>
      </AppView>
      <AppView style={styles.right}>
        <Pressable onPress={() => handleRemoveUpiId(upiId)}>
          <AppIcon name="close" size={18} color={theme.text.primary} />
        </Pressable>
      </AppView>
    </AppView>
  );
}

const styles = StyleSheet.create({
  upiId: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 8,
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
