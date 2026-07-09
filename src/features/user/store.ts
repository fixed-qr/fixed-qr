import { create } from "zustand";
import { persist } from "zustand/middleware";

import { createPersistOptions } from "@/store/zustand/persist";
import { User } from "@/types/user";

const ONE_MINUTE_MS = 60_000;
const IDENTITY_VERIFICATION_TTL_MS = ONE_MINUTE_MS * 2; // 2 minutes

interface UserStore {
  user: User | null;
  identityVerifiedAt: number | null;

  setUser: (user: User) => void;
  clearUser: () => void;

  verifyIdentity: () => void;
  clearIdentityVerification: () => void;

  isIdentityVerified: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      identityVerifiedAt: null,

      setUser: (user) =>
        set({
          user,
          identityVerifiedAt: null,
        }),

      clearUser: () =>
        set({
          user: null,
          identityVerifiedAt: null,
        }),

      verifyIdentity: () => {
        if (!get().user) return;

        set({
          identityVerifiedAt: Date.now(),
        });
      },

      clearIdentityVerification: () =>
        set({
          identityVerifiedAt: null,
        }),

      isIdentityVerified: () => {
        const { user, identityVerifiedAt } = get();

        if (!user || !identityVerifiedAt) {
          return false;
        }

        return Date.now() < identityVerifiedAt + IDENTITY_VERIFICATION_TTL_MS;
      },
    }),
    createPersistOptions<UserStore, Pick<UserStore, "user">>(
      "user-store",
      (state) => ({
        user: state.user,
      }),
    ),
  ),
);
