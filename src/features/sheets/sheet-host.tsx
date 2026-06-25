import { useTheme } from "@/hooks/use-theme";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { sheetRegistry } from "./sheet-registry";
import { SheetItem, useSheetStore } from "./use-sheet-store";

export function SheetHost() {
  const stack = useSheetStore((s) => s.stack);

  return (
    <>
      {stack.map((sheet, index) => (
        <SheetInstance key={sheet.id} sheet={sheet} index={index} />
      ))}
    </>
  );
}

interface SheetInstanceProps {
  sheet: SheetItem;
  index: number;
}

function SheetInstance({ sheet, index }: Readonly<SheetInstanceProps>) {
  const sheetRef = useRef<BottomSheetModal>(null);

  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const removeSheet = useSheetStore((s) => s.removeSheet);
  const SheetComponent = sheetRegistry[sheet.name];

  useEffect(() => {
    requestAnimationFrame(() => {
      sheetRef.current?.present();
    });
  }, []);

  return (
    <BottomSheetModal
      ref={sheetRef}
      enableDynamicSizing={true}
      enablePanDownToClose={true}
      topInset={insets.top}
      bottomInset={insets.bottom}
      keyboardBlurBehavior="restore"
      backdropComponent={renderAppSheetBackdrop}
      stackBehavior="push"
      onDismiss={() => {
        const exists = useSheetStore
          .getState()
          .stack.some((s) => s.id === sheet.id);

        if (exists) {
          removeSheet(sheet.id);
        }
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
      containerStyle={[StyleSheet.absoluteFill]}
    >
      <SheetComponent {...(sheet.params as any)} />
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
