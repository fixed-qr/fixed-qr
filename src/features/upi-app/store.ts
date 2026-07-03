import { createPersistOptions } from "@/store/zustand/persist";
import { UpiApp } from "@/types/upi-app";
import { UpiAppName } from "@/types/upi-app-name";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UpiApps } from "./types";

interface UpiAppStore {
  upiApps: Partial<UpiApps>;

  addUpiApp: (appName: UpiAppName, upiApp: UpiApp) => void;
  removeUpiApp: (appName: UpiAppName) => void;
  clearUpiApps: () => void;
}

export const useUpiAppStore = create<UpiAppStore>()(
  persist(
    (set) => ({
      upiApps: {},

      addUpiApp: (appName, upiApp) =>
        set((state) => ({
          upiApps: {
            ...state.upiApps,
            [appName]: upiApp,
          },
        })),
      removeUpiApp: (appName) =>
        set(function (state) {
          const { [appName]: _, ...remainingApps } = state.upiApps;

          return {
            upiApps: remainingApps,
          };
        }),
      clearUpiApps: () => set({ upiApps: {} }),
    }),
    createPersistOptions<UpiAppStore>("upi-app-store"),
  ),
);
