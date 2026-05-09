import { create } from "zustand";

type AuthStore = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,

  setIsAuthenticated: (value) =>
    set({
      isAuthenticated: value,
    }),
}));
