import { AppMeta } from "@/types/app-meta";
import { create } from "zustand";

const FILE_ID = "1aHei1cccqDJCa8vLhuJI4-7inImNUvki";

interface AppMetaStore {
  meta: AppMeta | null;
  fetchAppMeta: () => Promise<void>;
}

export const useAppMetaStore = create<AppMetaStore>((set) => ({
  meta: null,
  fetchAppMeta: async () => {
    try {
      const url = `https://drive.google.com/uc?id=${FILE_ID}&export=download`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const text = await response.text();
      const data = JSON.parse(text);

      set({
        meta: data,
      });
    } catch (error) {
      console.error("Error fetching Meta:", error);

      set({
        meta: null,
      });
    }
  },
}));
