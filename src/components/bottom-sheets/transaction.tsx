import { Amount, EmptyCard } from "@/components";
import {
    AppBottomSheet,
    AppIcon,
    AppImage,
    AppText,
    AppView,
} from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { useBottomSheetStore } from "@/store/bottom-sheet-store";
import { useUserDataStore } from "@/store/user-data-store";
import { AppDateTime } from "@/utils/app-date-time";
import { getProviderLabel } from "@/utils/get-provider-label";
import { getProviderLogo } from "@/utils/get-provider-logo";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet/src";
import { StyleSheet } from "react-native";

export function TransactionBottomSheet() {
  const theme = useTheme();
  const ref = useBottomSheetStore((state) =>
    state.register("transaction-bottom-sheet"),
  );
  const transactions = useUserDataStore((state) => state.transactions);

  return (
    <AppBottomSheet
      ref={ref}
      index={-1}
      snapPoints={["50%", "75%", "90%"]}
      enablePanDownToClose={true}
    >
      <BottomSheetScrollView
        style={{
          backgroundColor: theme.background.secondary,
        }}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        <AppView style={{ alignItems: "center", marginBottom: 16 }}>
          <AppText variant="headingSmall" weight="600">
            Transactions
          </AppText>
        </AppView>
        {transactions.length ? (
          <AppView
            style={[
              styles.transactions,
              {
                backgroundColor: theme.background.tertiary,
                borderColor: theme.border.primary,
              },
            ]}
          >
            {transactions.map((tsx, index) => (
              <AppView
                key={tsx.transactionId + index}
                style={[
                  styles.transaction,
                  {
                    borderColor: theme.border.primary,
                    borderBottomWidth:
                      index === transactions.length - 1 ? 0 : 1,
                  },
                ]}
              >
                <AppView style={styles.left}>
                  <AppImage
                    source={getProviderLogo(tsx.provider)}
                    style={styles.logoImage}
                  />
                </AppView>
                <AppView style={styles.right}>
                  <AppView style={styles.rightLeft}>
                    <AppText variant="button">
                      {getProviderLabel(tsx.provider)}
                    </AppText>
                    <AppText variant="bodySmall" color="tertiary">
                      {new AppDateTime(tsx.date).formatTo("datetime")}
                    </AppText>
                  </AppView>
                  <AppView style={styles.rightRight}>
                    <Amount value={tsx.amount} size={10} />
                    <AppIcon
                      name="arrow-back"
                      size={18}
                      color={theme.text.primary}
                      style={{ transform: "rotate(-45deg)" }}
                    />
                  </AppView>
                </AppView>
                <AppIcon
                  name="information-circle"
                  size={18}
                  color={theme.text.secondary}
                />
              </AppView>
            ))}
          </AppView>
        ) : (
          <EmptyCard message="Your recent transactions will appear here." />
        )}
      </BottomSheetScrollView>
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    width: "100%",
    minWidth: "100%",
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  transactions: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
  },
  transaction: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1.5,
    gap: 8,
  },
  left: {},
  right: {
    flex: 1,
    flexDirection: "row",
  },
  logoImage: {
    width: 24,
    height: 24,
  },
  rightLeft: {
    flex: 1,
    gap: 4,
  },
  rightRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
