import { Transaction } from "@/components";
import { Image, ThemedText, ThemedView } from "@/components/ui";
import { borderRadius } from "@/constants/platform";
import { useTheme } from "@/hooks/use-theme";
import { useDataStore } from "@/store/data-store";
import { getProviderLabel } from "@/utils/get-provider-label";
import { getProviderLogo } from "@/utils/get-provider-logo";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet/src";
import React, { Ref } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TransactionsProps {
  ref?: Ref<BottomSheet>;
  snapPoints?: (number | string)[];
}

export function Transactions({ ref, snapPoints }: TransactionsProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const transactions = useDataStore((state) => state.transactions);

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop {...props} appearsOnIndex={1} disappearsOnIndex={-1} />
  );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      topInset={insets.top}
      enablePanDownToClose
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={{ backgroundColor: theme.text.primary }}
      backgroundStyle={{
        backgroundColor: theme.background.primary,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
      }}
    >
      <ThemedText style={styles.title}>Transactions</ThemedText>
      <BottomSheetScrollView
        style={{
          backgroundColor: theme.background.primary,
          paddingHorizontal: 20,
        }}
      >
        {transactions.length ? (
          <ThemedView
            style={[
              styles.transactions,
              { backgroundColor: theme.background.secondary },
            ]}
          >
            {transactions.map((tsx, index) => (
              <Transaction
                key={tsx.transactionId + index}
                logoImage={getProviderLogo(tsx.provider)}
                label={getProviderLabel(tsx.provider)}
                timestamp={tsx.date}
                amount={tsx.amount}
                isLast={index === transactions.length - 1}
              />
            ))}
          </ThemedView>
        ) : (
          <ThemedView
            style={[
              styles.transactionEmpty,
              {
                backgroundColor: theme.background.secondary,
                borderColor: theme.border.primary,
              },
            ]}
          >
            <Image
              source={require("@/assets/images/icons/not-found.png")}
              style={styles.notFoundImage}
            />
            <ThemedText
              variant="small"
              style={[styles.emptyText, { color: theme.text.secondary }]}
            >
              Your recent transactions will appear here.
            </ThemedText>
          </ThemedView>
        )}
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 22,
    marginVertical: 8,
  },
  transactionsTitle: {
    marginTop: 16,
    paddingInline: 8,
  },
  transactions: {
    flex: 1,
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 28,
  },
  transactionEmpty: {
    marginTop: 8,
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
