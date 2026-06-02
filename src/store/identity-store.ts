import { create } from "zustand";

const MINUTE_MS = 60 * 1000;

const SESSION_DURATION_MS = 5 * MINUTE_MS;

interface IdentityStore {
  verifiedAt: number | null;

  verify: () => void;
  reset: () => void;
  hasValidSession: () => boolean;
}

export const useIdentityStore = create<IdentityStore>((set, get) => ({
  verifiedAt: null,

  verify: () =>
    set({
      verifiedAt: Date.now(),
    }),

  reset: () =>
    set({
      verifiedAt: null,
    }),

  hasValidSession: () => {
    const { verifiedAt } = get();

    return verifiedAt !== null && Date.now() - verifiedAt < SESSION_DURATION_MS;
  },
}));
