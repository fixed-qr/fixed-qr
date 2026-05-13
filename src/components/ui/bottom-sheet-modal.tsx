import { borderRadius } from "@/constants/platform";
import { useTheme } from "@/hooks/use-theme";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModalProvider,
    BottomSheetView,
    BottomSheetModal as GorhomBottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { ReactNode, forwardRef, useCallback, useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./themed-text";

interface BottomSheetModalProps {
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

export const BottomSheetModal = forwardRef<
  GorhomBottomSheetModal,
  BottomSheetModalProps
>(
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
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: theme.background }}
      >
        <BottomSheetModalProvider>
          <GorhomBottomSheetModal
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
          </GorhomBottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
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
