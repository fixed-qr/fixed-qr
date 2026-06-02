import { AppConfig } from "@/types/app-config";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createPersistOptions } from "./zustand/persist";

const DEFAULT_APP_CONFIG: AppConfig = {
  status: "online",
  release: {
    version: "1.0.0",
    versionCode: 100,
    title: "FixedQR Initial Release",
    websiteUrl: "https://fixed-qr.netlify.com",
    downloadUrl: "",
    publishedAt: "2026-05-20T03:20:56Z",
    notes: ["Initial release", "Welcome to FixedQR!"],
  },
};

interface AppConfigStore {
  appConfig: AppConfig;
  isLoading: boolean;
  error: string | null;

  fetchAppConfig: () => Promise<void>;
}

export const useAppConfigStore = create<AppConfigStore>()(
  persist(
    (set) => ({
      appConfig: DEFAULT_APP_CONFIG,
      isLoading: false,
      error: null,

      fetchAppConfig: async () => {
        try {
          set({
            isLoading: true,
            error: null,
          });

          const response = await fetch(
            "https://gist.githubusercontent.com/fixed-qr/32d520be4de453727c020d93f2f87b45/raw/app-config.json",
          );

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const appConfig = (await response.json()) as AppConfig;

          set({
            appConfig,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch app config",
            isLoading: false,
          });
        }
      },
    }),
    createPersistOptions<AppConfigStore>("app-config-store"),
  ),
);
