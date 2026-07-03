import { nanoid } from "nanoid/non-secure";
import { create } from "zustand";
import { SheetName, SheetParamsMap } from "./sheet-registry";

export type SheetItem<T extends SheetName = SheetName> = {
  id: string;
  name: T;
  params: SheetParamsMap[T];
};

interface SheetStore {
  stack: SheetItem[];

  push: <T extends SheetName>(name: T, params: SheetParamsMap[T]) => void;
  replace: <T extends SheetName>(name: T, params: SheetParamsMap[T]) => void;
  pop: () => void;
  removeSheet: (id: string) => void;
  closeAll: () => void;
}

export const useSheetStore = create<SheetStore>((set) => ({
  stack: [],

  push: (name, params) =>
    set((state) => {
      const exists = state.stack.some((sheet) => sheet.name === name);

      // Do not add the sheet if it already exists in the stack
      if (exists) {
        return state;
      }

      // Add the new sheet to the stack
      return {
        stack: [
          ...state.stack,
          {
            id: nanoid(),
            name,
            params,
          },
        ],
      };
    }),

  replace: (name, params) =>
    set((state) => ({
      stack: [
        ...state.stack.slice(0, -1),
        {
          id: nanoid(),
          name,
          params,
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
