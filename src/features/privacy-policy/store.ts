import { Asset } from "expo-asset";
import { File } from "expo-file-system";
import { create } from "zustand";

interface PrivacyPolicyState {
  privacyPolicy: string | null;
  isLoading: boolean;
  error: string | null;

  fetchPrivacyPolicy: () => Promise<void>;
}

export const usePrivacyPolicyStore = create<PrivacyPolicyState>((set) => ({
  privacyPolicy: null,
  isLoading: false,
  error: null,

  fetchPrivacyPolicy: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const asset = Asset.fromModule(require("@/assets/privacy-policy.md"));
      await asset.downloadAsync();

      const uri = asset.localUri ?? asset.uri;

      if (!uri) {
        throw new Error("Unable to resolve asset URI");
      }

      const file = new File(uri);

      const content = await file.text();

      set({
        privacyPolicy: content,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error(error);

      set({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to load Privacy Policy",
      });
    }
  },
}));
