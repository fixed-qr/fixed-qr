import { AppStatus } from "@/types/app-status";
import { create } from "zustand";

const publicDriveFileId = "1EPmnn5D3pMaFMdSOdEiddOertE4IAlCF";

interface AppStatusState {
  appStatus: AppStatus | null;
  loading: boolean;
  error: string | null;
  fetchAppStatus: () => Promise<void>;
}

export const useAppStatusStore = create<AppStatusState>((set) => ({
  appStatus: null,
  loading: false,
  error: null,
  fetchAppStatus: async () => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await fetch(
        `https://drive.google.com/uc?export=download&id=${publicDriveFileId}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = JSON.parse(await response.text()) as AppStatus;

      set({
        appStatus: data,
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
