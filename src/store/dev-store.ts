import BottomSheet from "@gorhom/bottom-sheet";
import { RefObject, createRef } from "react";
import { create } from "zustand";

interface DevState {
  ref: RefObject<BottomSheet | null>;
  expand: () => void;
  close: () => void;
  snapToIndex: (index: number) => void;
}

export const useDevStore = create<DevState>((_, get) => ({
  ref: createRef<BottomSheet>(),

  expand: () => {
    get().ref.current?.expand();
  },

  close: () => {
    get().ref.current?.close();
  },

  snapToIndex: (index: number) => {
    get().ref.current?.snapToIndex(index);
  },
}));
