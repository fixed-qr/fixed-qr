import { mmkvStorage } from "@/storage/mmkv-storage";
import { AppConfig } from "@/types/app-config";
import { create } from "zustand";

const APP_CONFIG_KEY = "app-config";

const defaultConfig: AppConfig = {
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

interface AppConfigState {
  appConfig: AppConfig;
  loading: boolean;
  error: string | null;

  fetchAppConfig: () => Promise<void>;
}

const getCachedConfig = (): AppConfig => {
  try {
    const cached = mmkvStorage.getString(APP_CONFIG_KEY);

    if (!cached) {
      mmkvStorage.set(APP_CONFIG_KEY, JSON.stringify(defaultConfig));
      return defaultConfig;
    }

    return JSON.parse(cached) as AppConfig;
  } catch {
    return defaultConfig;
  }
};

export const useAppConfigStore = create<AppConfigState>((set) => ({
  appConfig: getCachedConfig(),
  loading: false,
  error: null,

  fetchAppConfig: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await fetch(
        "https://gist.githubusercontent.com/fixed-qr/32d520be4de453727c020d93f2f87b45/raw/app-config.json",
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = (await response.json()) as AppConfig;

      // persist cache
      mmkvStorage.set(APP_CONFIG_KEY, JSON.stringify(data));

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
