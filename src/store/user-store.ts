import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPersistOptions } from "./zustand/persist";

interface UserStore {
  user: User | null;

  createUser: (data: User) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      createUser: (data) => set({ user: data }),
      removeUser: () => set({ user: null }),
    }),
    createPersistOptions<UserStore>("user-store"),
  ),
);
