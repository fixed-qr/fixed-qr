import { useTheme } from "@/hooks/use-theme";
import { useStore } from "@/store/useStore";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { Image, Ionicons, ThemedText, ThemedView } from "../ui";
import { UpiId } from "../upi-id";

export function UpiIds() {
  const theme = useTheme();
  const upiIds = useStore((state) => state.upiIds);

  return (
    <ThemedView>
      <ThemedView style={styles.upiIdTitle}>
        <ThemedText
          style={[styles.upiIdTitleText, { color: theme.textSecondary }]}
        >
          Added UPI
        </ThemedText>
        <Link href={"/(modals)/add-upi"}>
          <Ionicons name="add-circle" size={24} color={theme.textSecondary} />
        </Link>
      </ThemedView>
      {upiIds.length ? (
        <ThemedView
          style={[styles.upiIds, { backgroundColor: theme.backgroundElement }]}
        >
          {upiIds.map((u, index) => (
            <UpiId
              key={u.provider + index}
              logoImage={getProviderLogo(u.provider)}
              label={u.label}
              upiId={u.upiId}
              isLast={index === upiIds.length - 1}
            />
          ))}
        </ThemedView>
      ) : (
        <ThemedView
          style={[
            styles.upiIdsEmpty,
            {
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
            },
          ]}
        >
          <Image
            source={require("@/assets/images/icons/not-found.png")}
            style={styles.notFoundImage}
          />
          <ThemedText
            type="small"
            themeColor="textSecondary"
            style={styles.emptyText}
          >
            Your recent transactions will appear here.
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  upiIdTitle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: 8,
  },
  upiIdTitleText: {},
  upiIds: {
    flex: 1,
    marginTop: 12,
    paddingBlock: 8,
    borderRadius: 28,
    overflow: "hidden",
  },
  upiIdsEmpty: {
    marginTop: 16,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    borderRadius: 24,
    borderWidth: 1,
  },
  notFoundImage: {
    objectFit: "contain",
    width: 120,
    height: 120,
  },
  emptyText: {
    textAlign: "center",
  },
});
