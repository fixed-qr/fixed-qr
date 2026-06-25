import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useSheetStore } from "./use-sheet-store";

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
