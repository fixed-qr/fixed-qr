import { createPersistOptions } from "@/store/zustand/persist";
import { UpiAppName } from "@/types/upi-app-name";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { History } from "./types";

interface HistoryStore {
  histories: History[];

  addHistory: (history: History) => void;
  clearHistoriesForApp: (appName: UpiAppName) => void;
  clearHistories: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      histories: [],

      addHistory: (history) =>
        set((state) => {
          const updatedHistories = [history, ...state.histories];

          return {
            histories: updatedHistories.slice(0, 25),
          };
        }),

      clearHistoriesForApp: (appName) =>
        set((state) => ({
          histories: state.histories.filter(
            (history) => history.appName !== appName,
          ),
        })),

      clearHistories: () => set({ histories: [] }),
    }),
    createPersistOptions<HistoryStore>("history-store"),
  ),
);
