import { BottomSheetKey } from "@/types/bottom-sheets-keys";
import BottomSheet from "@gorhom/bottom-sheet";
import { createRef, RefObject } from "react";
import { create } from "zustand";

type SheetRef = RefObject<BottomSheet | null>;

interface BottomSheetStore {
  refs: Partial<Record<BottomSheetKey, SheetRef>>;

  register: (key: BottomSheetKey) => SheetRef;
  expand: (key: BottomSheetKey) => void;
  close: (key: BottomSheetKey) => void;
  snapToIndex: (key: BottomSheetKey, index: number) => void;
}

export const useBottomSheetStore = create<BottomSheetStore>((set, get) => ({
  refs: {},

  register: (key) => {
    const existingRef = get().refs[key];

    if (existingRef) {
      return existingRef;
    }

    const ref = createRef<BottomSheet>();

    set((state) => ({
      refs: {
        ...state.refs,
        [key]: ref,
      },
    }));

    return ref;
  },

  expand: (key) => {
    get().refs[key]?.current?.expand();
  },

  close: (key) => {
    get().refs[key]?.current?.close();
  },

  snapToIndex: (key, index) => {
    get().refs[key]?.current?.snapToIndex(index);
  },
}));
