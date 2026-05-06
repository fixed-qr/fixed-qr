import { storage } from "@/storage/mmkv";
import { Transaction } from "@/types/transaction";
import { UpiId } from "@/types/upi";
import { User } from "@/types/user";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Store {
  user: User | null;
  upiIds: UpiId[];
  transactions: Transaction[];
  setUser: (data: User) => void;
  addUpiId: (upi: UpiId) => void;
  removeUpiId: (upiId: string) => void;
  addTransaction: (txn: Transaction) => void;
  clearAll: () => void;
}

export const useStore = create<Store>()(
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
        set({
          transactions: [txn, ...get().transactions],
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
          const value = storage.getString(name);
          return value ?? null;
        },
        setItem: (name, value) => {
          storage.set(name, value);
        },
        removeItem: (name) => {
          storage.remove(name);
        },
      })),
    },
  ),
);
