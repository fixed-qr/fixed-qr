import BottomSheet from "@gorhom/bottom-sheet";
import { createRef, RefObject } from "react";
import { create } from "zustand";

export const SHEETS = {
  DEV: "dev-sheet",
  QR: "qr-sheet",
  TRANSACTION: "transaction-sheet",
} as const;

export type SheetKey = (typeof SHEETS)[keyof typeof SHEETS];

type SheetRef = RefObject<BottomSheet | null>;

interface BottomSheetStore {
  refs: Partial<Record<SheetKey, SheetRef>>;
  register: (key: SheetKey) => SheetRef;
  expand: (key: SheetKey) => void;
  close: (key: SheetKey) => void;
  snapToIndex: (key: SheetKey, index: number) => void;
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
