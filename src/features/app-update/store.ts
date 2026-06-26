import { createPersistOptions } from "@/store/zustand/persist";
import { AppUpdate } from "@/types/app-update";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppUpdateStore {
  appUpdate: AppUpdate | null;
  isLoading: boolean;
  error: string | null;

  checkAppUpdate: () => Promise<void>;
}

export const useAppUpdateStore = create<AppUpdateStore>()(
  persist(
    (set) => ({
      appUpdate: null,
      isLoading: false,
      error: null,

      checkAppUpdate: async () => {
        try {
          set({
            isLoading: true,
            error: null,
          });

          const response = await fetch(
            "https://raw.githubusercontent.com/fixed-qr/fixed-qr/refs/heads/main/app-update.json",
          );

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const appUpdate = (await response.json()) as AppUpdate;

          set({
            appUpdate,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to check app update",
            isLoading: false,
          });
        }
      },
    }),
    createPersistOptions<AppUpdateStore>("app-update-store"),
  ),
);
