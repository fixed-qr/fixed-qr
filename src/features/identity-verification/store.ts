import { create } from "zustand";

const MINUTE_MS = 60 * 1000;

const SESSION_DURATION_MS = MINUTE_MS * 5; // 5 minutes

interface IdentityVerificationStore {
  verifiedAt: number | null;

  verifyIdentity: () => void;
  resetIdentity: () => void;
  isSessionValid: () => boolean;
}

export const useIdentityVerificationStore = create<IdentityVerificationStore>(
  (set, get) => ({
    verifiedAt: null,

    verifyIdentity: () => set({ verifiedAt: Date.now() }),
    resetIdentity: () => set({ verifiedAt: null }),
    isSessionValid: () => {
      const { verifiedAt } = get();

      return (
        verifiedAt !== null && Date.now() - verifiedAt < SESSION_DURATION_MS
      );
    },
  }),
);
