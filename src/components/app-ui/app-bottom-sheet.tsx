import { borderRadius } from "@/constants/platform";
import { useTheme } from "@/hooks/use-theme";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import React, { ReactNode, forwardRef, useCallback, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppBottomSheetProps {
  children: ReactNode;
  index?: number;
  snapPoints?: (string | number)[];
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  backdropPressBehavior?: "none" | "close" | "collapse";
}

export const AppBottomSheet = forwardRef<BottomSheet, AppBottomSheetProps>(
  (
    {
      children,
      index,
      snapPoints,
      enableDynamicSizing,
      enablePanDownToClose,
      backdropPressBehavior,
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
          pressBehavior={backdropPressBehavior || "close"}
        />
      ),
      [],
    );

    return (
      <BottomSheet
        ref={ref}
        index={index}
        topInset={insets.top}
        snapPoints={memoizedSnapPoints}
        enableDynamicSizing={enableDynamicSizing}
        enablePanDownToClose={enablePanDownToClose}
        keyboardBlurBehavior="restore"
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{
          backgroundColor: theme.text.muted,
          width: 36,
          height: 4,
          borderRadius: 4,
        }}
        backgroundStyle={{
          backgroundColor: theme.background.secondary,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
        }}
      >
        {children}
      </BottomSheet>
    );
  },
);
