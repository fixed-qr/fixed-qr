import { Asset } from "expo-asset";
import { File } from "expo-file-system";
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
      set({
        loading: true,
        error: null,
      });

      try {
        const asset = Asset.fromModule(
          require("@/assets/legal-information.md"),
        );
        await asset.downloadAsync();

        const uri = asset.localUri ?? asset.uri;

        if (!uri) {
          throw new Error("Unable to resolve asset URI");
        }

        const file = new File(uri);

        const content = await file.text();

        set({
          legalInformation: content,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error(error);

        set({
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to load legal information",
        });
      }
    },
  }),
);
