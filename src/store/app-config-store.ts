import { AppConfig } from "@/types/app-config";
import { create } from "zustand";

interface AppConfigState {
  appConfig: AppConfig | null;
  loading: boolean;
  error: string | null;
  fetchAppConfig: () => Promise<void>;
}

export const useAppConfigStore = create<AppConfigState>((set) => ({
  appConfig: null,
  loading: false,
  error: null,
  fetchAppConfig: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await fetch(
        `https://raw.githubusercontent.com/fixed-qr/fixed-qr/refs/heads/main/app-config.json`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as AppConfig;

      set({
        appConfig: data,
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
