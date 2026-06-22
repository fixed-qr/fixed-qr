import { useTheme } from "@/hooks/use-theme";
import { useAppSheetStore } from "@/store/app-sheet-store";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useFocusEffect, useGlobalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { BackHandler, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";

export interface AppSheetProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface SheetState {
  isOpen: boolean;
  isAnimating: boolean;
}

export function AppSheet({
  children,
  containerStyle,
}: Readonly<AppSheetProps>) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const sheetState = useRef<SheetState>({
    isOpen: false,
    isAnimating: false,
  });

  const { isChildSheet } = useGlobalSearchParams<{ isChildSheet?: "true" }>();
  const { sheetRef, enableDynamicSizing, snapPoints } = useAppSheetStore(
    useShallow((state) => ({
      sheetRef: state.sheetRef,
      enableDynamicSizing: state.enableDynamicSizing,
      snapPoints: state.snapPoints,
    })),
  );

  useEffect(() => {
    sheetRef.current?.present();
  }, [sheetRef]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Back press ignored while animating
        if (sheetState.current.isAnimating) {
          return true;
        }

        // Handle navigation and sheet closing
        if (sheetState.current.isOpen) {
          if (isChildSheet) {
            router.back();
          } else {
            sheetRef.current?.dismiss();
          }
          return true;
        }

        // Not handled here, let navigation/system handle it
        return false;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress,
      );

      return () => subscription.remove();
    }, [sheetRef, isChildSheet, router]),
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={enableDynamicSizing}
      enablePanDownToClose={true}
      topInset={insets.top}
      bottomInset={insets.bottom}
      keyboardBlurBehavior="restore"
      backdropComponent={renderAppSheetBackdrop}
      onDismiss={() => {
        router.back();
      }}
      onAnimate={() => {
        sheetState.current.isAnimating = true;
      }}
      onChange={(index) => {
        sheetState.current.isOpen = index !== -1;
        sheetState.current.isAnimating = false;
      }}
      animationConfigs={{
        duration: 380,
      }}
      handleStyle={{
        borderBottomWidth: 1,
        borderColor: theme.border.primary,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.text.muted,
        width: 48,
        height: 4,
        borderRadius: 4,
      }}
      backgroundStyle={{
        backgroundColor: theme.background.secondary,
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
      }}
      containerStyle={[StyleSheet.absoluteFill, containerStyle]}
    >
      {children}
    </BottomSheetModal>
  );
}

function renderAppSheetBackdrop(props: Readonly<BottomSheetBackdropProps>) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      opacity={0.5}
    />
  );
}
