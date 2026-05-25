import { create } from "zustand";

interface LegalInformationState {
  legalInformation: string | null;
  loading: boolean;
  error: string | null;
  fetchLegalInformation: () => Promise<void>;
}

export const useLegalInformationStore = create<LegalInformationState>(
  (set) => ({
    legalInformation: null,
    loading: false,
    error: null,
    fetchLegalInformation: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        const response = await fetch(
          "https://raw.githubusercontent.com/fixed-qr/fixed-qr/refs/heads/main/legal-information.md",
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.text();

        set({
          legalInformation: data,
          loading: false,
        });
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : "Failed to fetch data",
          loading: false,
        });
      }
    },
  }),
);
