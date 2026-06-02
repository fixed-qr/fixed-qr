import { StateStorage } from "zustand/middleware";
import { mmkvStorage } from "./mmkv-storage";

export const zustandStorage: StateStorage = {
  getItem: (name) => {
    return mmkvStorage.getString(name) ?? null;
  },

  setItem: (name, value) => {
    mmkvStorage.set(name, value);
  },

  removeItem: (name) => {
    mmkvStorage.remove(name);
  },
};
