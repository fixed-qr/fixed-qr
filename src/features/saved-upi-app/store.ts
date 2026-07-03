import { createPersistOptions } from "@/store/zustand/persist";
import { SavedUpiApps } from "@/types/saved-upi-apps";
import { UpiApp } from "@/types/upi-app";
import { UpiAppName } from "@/types/upi-app-name";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SavedUpiAppStore {
  savedUpiApps: Partial<SavedUpiApps>;

  addUpiApp: (appName: UpiAppName, upiApp: UpiApp) => void;
  removeUpiApp: (appName: UpiAppName) => void;
  clearUpiApps: () => void;
}

export const useSavedUpiAppStore = create<SavedUpiAppStore>()(
  persist(
    (set) => ({
      savedUpiApps: {},

      addUpiApp: (appName, upiApp) =>
        set((state) => ({
          savedUpiApps: {
            ...state.savedUpiApps,
            [appName]: upiApp,
          },
        })),
      removeUpiApp: (appName) =>
        set(function (state) {
          const { [appName]: _, ...remainingApps } = state.savedUpiApps;

          return {
            savedUpiApps: remainingApps,
          };
        }),
      clearUpiApps: () => set({ savedUpiApps: {} }),
    }),
    createPersistOptions<SavedUpiAppStore>("saved-upi-app-store"),
  ),
);
