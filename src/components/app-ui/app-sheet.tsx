import { borderRadius } from "@/constants/platform";
import { useTheme } from "@/hooks/use-theme";
import { useAppSheetStore } from "@/store/app-sheet-store";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { BackHandler, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useShallow } from "zustand/react/shallow";

interface AppSheetProps {
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export function AppSheet({
  children,
  containerStyle,
}: Readonly<AppSheetProps>) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const sheetOpen = useRef(false);
  const isAnimating = useRef(false);

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
        if (isAnimating.current) {
          return true;
        }

        // Handle sheet closing
        if (sheetOpen.current) {
          sheetRef.current?.dismiss();
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
    }, [sheetRef]),
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={enableDynamicSizing}
      enablePanDownToClose={true}
      topInset={insets.top}
      bottomInset={insets.bottom}
      backdropComponent={renderAppSheetBackdrop}
      onDismiss={() => {
        router.back();
      }}
      onAnimate={() => {
        isAnimating.current = true;
      }}
      onChange={(index) => {
        sheetOpen.current = index !== -1;
        isAnimating.current = false;
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
        width: 36,
        height: 4,
        borderRadius: 4,
      }}
      backgroundStyle={{
        backgroundColor: theme.background.secondary,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
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
