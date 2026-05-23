import { DevInfo } from "@/types/dev-info";
import { create } from "zustand";

interface DevInfoState {
  devInfo: DevInfo | null;
  loading: boolean;
  error: string | null;
  fetchDevInfo: () => Promise<void>;
}

export const useDevInfoStore = create<DevInfoState>((set) => ({
  devInfo: null,
  loading: false,
  error: null,
  fetchDevInfo: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await fetch(
        "https://raw.githubusercontent.com/fixed-qr/fixed-qr/refs/heads/main/dev-info.json",
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as DevInfo;

      set({
        devInfo: data,
        loading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to fetch data",
        loading: false,
      });
    }
  },
}));
