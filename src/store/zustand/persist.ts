import { zustandStorage } from "@/storage/zustand-storage";
import { createJSONStorage, PersistOptions } from "zustand/middleware";

export const createPersistStorage = <T>() =>
  createJSONStorage<T>(() => zustandStorage);

export const createPersistOptions = <T extends object, P = T>(
  name: string,
  partialize?: (state: T) => P,
): PersistOptions<T, P> => ({
  name,
  storage: createPersistStorage<P>(),
  partialize,
});
