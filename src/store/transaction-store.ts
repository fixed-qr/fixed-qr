import { Transaction } from "@/types/transaction";
import { UpiAppName } from "@/types/upi-app-name";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPersistOptions } from "./zustand/persist";

interface TransactionStore {
  transactions: Transaction[];

  addTransaction: (txn: Transaction) => void;
  deleteMany: (appName: UpiAppName) => void;
  clearTransactions: () => void;
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

      deleteMany: (appName) =>
        set((state) => ({
          transactions: state.transactions.filter(
            (tsx) => tsx.appName !== appName,
          ),
        })),

      clearTransactions: () => set({ transactions: [] }),
    }),
    createPersistOptions<TransactionStore>("transaction-store"),
  ),
);
