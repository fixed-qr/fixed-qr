import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { createRef, RefObject } from "react";
import { create } from "zustand";

type SheetRef = RefObject<BottomSheetModal | null>;
type SnapPoints = (string | number)[];

interface AppSheetStore {
  sheetRef: SheetRef;

  enableDynamicSizing: boolean;
  snapPoints: SnapPoints;
  setEnableDynamicSizing: (enabled: boolean) => void;
  setSnapPoints: (points: SnapPoints) => void;

  present: () => void;
  dismiss: () => void;
  snapToIndex: (index: number) => void;
}

export const useAppSheetStore = create<AppSheetStore>((set, get) => ({
  sheetRef: createRef<BottomSheetModal>(),

  enableDynamicSizing: true,
  snapPoints: [],

  setEnableDynamicSizing: (enabled) => set({ enableDynamicSizing: enabled }),
  setSnapPoints: (points) => set({ snapPoints: points }),

  present: () => {
    get().sheetRef.current?.present();
  },

  dismiss: () => {
    get().sheetRef.current?.dismiss();
  },

  snapToIndex: (index: number) => {
    get().sheetRef.current?.snapToIndex(index);
  },
}));
