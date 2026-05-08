import { providers } from "@/constants/providers";
import { ProviderEnum } from "@/types/provider";

export const getProviderLabel = (provider: ProviderEnum): string => {
  const obj = providers.find((pr) => pr.provider === provider);
  return obj?.label as string;
};
