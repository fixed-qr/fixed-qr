import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPersistOptions } from "./zustand/persist";

interface UserStore {
  user: User | null;
  setUser: (data: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (data) => set({ user: data }),
      clearUser: () => set({ user: null }),
    }),
    createPersistOptions<UserStore>("user-store"),
  ),
);
