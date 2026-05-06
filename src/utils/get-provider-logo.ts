import { providers } from "@/constants/providers";
import { ProviderEnum } from "@/types/provider";
import { ImageSourcePropType } from "react-native";

export const getProviderLogo = (
  provider: ProviderEnum,
): ImageSourcePropType => {
  const obj = providers.find((pr) => pr.provider === provider);
  return obj?.logoImage as ImageSourcePropType;
};
