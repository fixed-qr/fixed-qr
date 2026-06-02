import { UpiApp } from "@/types/upi-app";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPersistOptions } from "./zustand/persist";

interface UpiAppStore {
  upiApp: UpiApp[];

  addUpiApp: (upiApp: UpiApp) => void;
  removeUpiApp: (upiId: string) => void;
  clearUpiApp: () => void;
}

export const useUpiAppStore = create<UpiAppStore>()(
  persist(
    (set) => ({
      upiApp: [],

      addUpiApp: (upiApp) =>
        set((state) => ({ upiApp: [upiApp, ...state.upiApp] })),
      removeUpiApp: (upiId) =>
        set((state) => ({
          upiApp: state.upiApp.filter((upiApp) => upiApp.upiId !== upiId),
        })),
      clearUpiApp: () => set({ upiApp: [] }),
    }),
    createPersistOptions<UpiAppStore>("upi-app-store"),
  ),
);
