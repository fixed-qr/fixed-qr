import { DevInfo } from "@/types/dev-info";
import { create } from "zustand";

const publicDriveFileId = "1HiOfGMomBHtHYVnN_F2l3hDieiUnZPRj";

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
        `https://drive.google.com/uc?export=download&id=${publicDriveFileId}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = JSON.parse(await response.text()) as DevInfo;

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
