import { zustandStorage } from "@/storage/zustand-storage";
import { createJSONStorage, PersistOptions } from "zustand/middleware";

export const createPersistStorage = () =>
  createJSONStorage(() => zustandStorage);

export const createPersistOptions = <T>(name: string): PersistOptions<T> => ({
  name,
  storage: createJSONStorage(() => zustandStorage),
});
