import { providers } from "@/constants/providers";
import { UpiId } from "@/types/upi";
import { ImageSourcePropType } from "react-native";

export const getProviderLogo = (upi: UpiId): ImageSourcePropType => {
  const obj = providers.find((pr) => pr.provider === upi.provider);
  return obj?.logoImage as ImageSourcePropType;
};
