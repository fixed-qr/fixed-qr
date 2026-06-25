import { nanoid } from "nanoid/non-secure";
import { create } from "zustand";
import { SheetName, SheetPayloadMap } from "./sheet-registry";

export type SheetItem<T extends SheetName = SheetName> = {
  id: string;
  name: T;
  payload: SheetPayloadMap[T];
};

interface SheetStore {
  stack: SheetItem[];

  push: <T extends SheetName>(name: T, payload: SheetPayloadMap[T]) => void;
  replace: <T extends SheetName>(name: T, payload: SheetPayloadMap[T]) => void;
  pop: () => void;
  removeSheet: (id: string) => void;
  closeAll: () => void;
}

export const useSheetStore = create<SheetStore>((set) => ({
  stack: [],

  push: (name, payload) =>
    set((state) => ({
      stack: [
        ...state.stack,
        {
          id: nanoid(),
          name,
          payload,
        },
      ],
    })),

  replace: (name, payload) =>
    set((state) => ({
      stack: [
        ...state.stack.slice(0, -1),
        {
          id: nanoid(),
          name,
          payload,
        },
      ],
    })),

  pop: () =>
    set((state) => ({
      stack: state.stack.slice(0, -1),
    })),

  removeSheet: (id) =>
    set((state) => ({
      stack: state.stack.filter((s) => s.id !== id),
    })),

  closeAll: () => set({ stack: [] }),
}));
