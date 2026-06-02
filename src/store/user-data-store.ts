import { mmkvStorage } from "@/storage/mmkv-storage";
import { Transaction } from "@/types/transaction";
import { UpiId } from "@/types/upi";
import { User } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DataStore {
  user: User | null;
  upiIds: UpiId[];
  transactions: Transaction[];
  setUser: (data: User) => void;
  addUpiId: (upi: UpiId) => void;
  removeUpiId: (upiId: string) => void;
  addTransaction: (txn: Transaction) => void;
  clearAll: () => void;
}

export const useUserDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      user: null,
      upiIds: [],
      transactions: [],
      setUser: (data) => set({ user: data }),
      addUpiId: (upi) =>
        set({
          upiIds: [...get().upiIds, upi],
        }),
      removeUpiId: (upiId) =>
        set({
          upiIds: get().upiIds.filter((item) => item.upiId !== upiId),
        }),
      addTransaction: (txn) =>
        set((state) => {
          const updated = [txn, ...state.transactions];

          return {
            transactions: updated.slice(0, 20), // keep only latest 20
          };
        }),
      clearAll: () =>
        set({
          user: null,
          upiIds: [],
          transactions: [],
        }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          const value = mmkvStorage.getString(name);
          return value ?? null;
        },
        setItem: (name, value) => {
          mmkvStorage.set(name, value);
        },
        removeItem: (name) => {
          mmkvStorage.remove(name);
        },
      })),
    },
  ),
);
