import { borderRadius } from "@/constants/platform";
import { useTheme } from "@/hooks/use-theme";
import GorhomBottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import type { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { ReactNode, forwardRef, useCallback, useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./themed-text";

interface BottomSheetProps {
  title?: string;
  children: ReactNode;
  index?: number;
  snapPoints?: (string | number)[];
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  renderHeader?: () => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  backdropPressBehavior?: "none" | "close" | "collapse";
}

export const BottomSheet = forwardRef<BottomSheetMethods, BottomSheetProps>(
  (
    {
      title,
      children,
      index,
      snapPoints,
      enableDynamicSizing,
      enablePanDownToClose,
      backdropPressBehavior = "close",
      renderHeader,
      containerStyle,
    },
    ref,
  ) => {
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.5}
          pressBehavior={backdropPressBehavior}
        />
      ),
      [],
    );

    return (
      <GorhomBottomSheet
        ref={ref}
        index={index}
        topInset={insets.top}
        snapPoints={memoizedSnapPoints}
        enableDynamicSizing={enableDynamicSizing}
        enablePanDownToClose={enablePanDownToClose}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: theme.text,
        }}
        backgroundStyle={{
          backgroundColor: theme.background,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        }}
      >
        <BottomSheetView
          style={[
            styles.content,
            {
              backgroundColor: theme.background,
            },
            containerStyle,
          ]}
        >
          {renderHeader ? (
            renderHeader()
          ) : title ? (
            <ThemedText style={styles.headerTitle}>{title}</ThemedText>
          ) : null}

          {children}
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  },
);

BottomSheet.displayName = "BottomSheet";

const styles = StyleSheet.create({
  headerTitle: {
    textAlign: "center",
    fontSize: 22,
    marginVertical: 8,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
});
