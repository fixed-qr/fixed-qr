import { borderRadius } from "@/constants/platform";
import { useTheme } from "@/hooks/use-theme";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef } from "react";
import { BackHandler, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppSheetProps {
  children: React.ReactNode;
  enableDynamicSizing?: boolean;
  snapPoints?: (string | number)[];
  index?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export function AppSheet({
  children,
  enableDynamicSizing,
  snapPoints,
  index,
  containerStyle,
}: Readonly<AppSheetProps>) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const sheetRef = useRef<BottomSheetModal>(null);
  const sheetOpen = useRef(false);
  const isAnimating = useRef(false);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.25}
      />
    ),
    [],
  );

  useEffect(() => {
    sheetRef.current?.present();
  }, []);

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

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
    }, []),
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={index}
      snapPoints={snapPoints}
      onDismiss={onDismiss}
      onAnimate={() => {
        isAnimating.current = true;
      }}
      onChange={(index) => {
        sheetOpen.current = index !== -1;
        isAnimating.current = false;
      }}
      enablePanDownToClose={true}
      enableDynamicSizing={enableDynamicSizing}
      topInset={insets.top}
      bottomInset={insets.bottom}
      backdropComponent={renderBackdrop}
      animationConfigs={{
        duration: 380,
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
      }}
      containerStyle={[StyleSheet.absoluteFill, containerStyle]}
    >
      {children}
    </BottomSheetModal>
  );
}
