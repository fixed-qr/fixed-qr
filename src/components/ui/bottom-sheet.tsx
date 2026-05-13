import { borderRadius } from "@/constants/platform";
import { useTheme } from "@/hooks/use-theme";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { ReactNode, forwardRef, useCallback, useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./themed-text";

interface UIBottomSheetProps {
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

export const UIBottomSheet = forwardRef<BottomSheet, UIBottomSheetProps>(
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
          opacity={0.25}
          pressBehavior={backdropPressBehavior}
        />
      ),
      [],
    );

    return (
      <BottomSheet
        ref={ref}
        index={index ?? 0}
        topInset={insets.top}
        snapPoints={memoizedSnapPoints}
        enableDynamicSizing={enableDynamicSizing}
        enablePanDownToClose={enablePanDownToClose}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: theme.text.primary,
        }}
        backgroundStyle={{
          backgroundColor: theme.background.secondary,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        }}
      >
        <BottomSheetView
          style={[
            styles.content,
            {
              backgroundColor: theme.background.secondary,
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
      </BottomSheet>
    );
  },
);

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
