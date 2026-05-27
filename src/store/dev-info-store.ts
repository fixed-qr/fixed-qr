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
        "https://gist.githubusercontent.com/fixed-qr/32d520be4de453727c020d93f2f87b45/raw/21926cf089c6d5c6f7dde7fe8c4e97166d15853e/developer-information.json",
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
