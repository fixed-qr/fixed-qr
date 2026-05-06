import { providers } from "@/constants/providers";
import { spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useStore } from "@/store/useStore";
import { UpiId } from "@/types/upi";
import { Link } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons, ThemedText, ThemedView } from "./ui";

export function UPISection() {
  const theme = useTheme();
  const upiIds = useStore((state) => state.upiIds);
  const removeUpiId = useStore((state) => state.removeUpiId);

  const getLogoUrl = (upi: UpiId): ImageSourcePropType => {
    const obj = providers.find((pr) => pr.provider === upi.provider);
    return obj?.logoImage as ImageSourcePropType;
  };

  return (
    <ThemedView>
      <ThemedView style={styles.upiHeader}>
        <ThemedText
          style={[styles.upiHeaderTitle, { color: theme.textSecondary }]}
        >
          Added UPI
        </ThemedText>
        <Link href={"/(modals)/add-upi"}>
          <Ionicons name="add-circle" size={24} color={theme.textSecondary} />
        </Link>
      </ThemedView>

      <ThemedView
        style={[styles.upiList, { backgroundColor: theme.backgroundElement }]}
      >
        {/* UPI ID */}
        {upiIds.length ? (
          upiIds.map((upi, index) => (
            <ThemedView
              style={[
                styles.upi,
                { borderColor: theme.background },
                index === upiIds.length - 1 && { borderBottomWidth: 0 },
              ]}
              key={upi.provider + upi.upiId}
            >
              <ThemedView style={styles.upiLeft}>
                <ThemedView style={styles.upiLogo}>
                  <Image source={getLogoUrl(upi)} style={styles.upiLogoImage} />
                </ThemedView>
                <ThemedView style={styles.upiInfo}>
                  <ThemedText>{upi.label}</ThemedText>
                  <ThemedText
                    type="small"
                    style={{ color: theme.textSecondary }}
                  >
                    {upi.upiId}
                  </ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedView style={styles.upiRight}>
                <Pressable onPress={() => removeUpiId(upi.upiId)}>
                  <Ionicons
                    name="close"
                    size={24}
                    color={theme.textSecondary}
                  />
                </Pressable>
              </ThemedView>
            </ThemedView>
          ))
        ) : (
          <ThemedView style={styles.upiIdEmpty}>
            <ThemedText
              themeColor="textSecondary"
              style={styles.upiIdEmptyText}
            >
              Upi id not added. Please add at list one upi to continue
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  upiHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: 8,
  },
  upiHeaderTitle: {},
  upiList: {
    flex: 1,
    marginTop: 12,
    paddingBlock: 8,
    borderRadius: 28,
    overflow: "hidden",
  },
  upi: {
    flex: 1,
    flexDirection: "row",
    paddingBlock: 4,
    paddingInline: 12,
    borderBottomWidth: 1.5,
    backgroundColor: "transparent",
  },
  upiLeft: {
    flex: 1,
    flexDirection: "row",
    gap: spacing[8],
    backgroundColor: "transparent",
  },
  upiRight: {
    backgroundColor: "transparent",
  },
  upiLogo: {
    backgroundColor: "transparent",
  },
  upiLogoImage: {
    width: 24,
    height: 24,
  },
  upiInfo: {
    backgroundColor: "transparent",
  },
  upiIdEmpty: {
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  upiIdEmptyText: {
    textAlign: "center",
  },
});
