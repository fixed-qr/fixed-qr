import { Transaction } from "@/types/transaction";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPersistOptions } from "./zustand/persist";

interface TransactionStore {
  transactions: Transaction[];

  addTransaction: (txn: Transaction) => void;
  clearTransaction: () => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],

      addTransaction: (txn) =>
        set((state) => {
          const updated = [txn, ...state.transactions];

          return {
            transactions: updated.slice(0, 20), // keep only latest 20
          };
        }),
      clearTransaction: () => set({ transactions: [] }),
    }),
    createPersistOptions<TransactionStore>("transaction-store"),
  ),
);
