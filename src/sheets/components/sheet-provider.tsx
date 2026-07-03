import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PropsWithChildren, useEffect } from "react";
import { BackHandler } from "react-native";
import { useSheetStore } from "../use-sheet-store";
import { SheetHost } from "./sheet-host";

export function SheetBackHandler() {
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      const { stack, pop } = useSheetStore.getState();

      if (stack.length === 0) {
        return false;
      }

      pop();

      return true;
    });

    return () => sub.remove();
  }, []);

  return null;
}

export function SheetProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <BottomSheetModalProvider>
      {children}

      <SheetHost />
      <SheetBackHandler />
    </BottomSheetModalProvider>
  );
}
