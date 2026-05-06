import { ImageSourcePropType } from "react-native";

export type ProviderEnum = "paytm" | "phone-pe" | "google-pay" | "amazon-pay";

export interface Provider {
  provider: ProviderEnum;
  label: string;
  logoImage: ImageSourcePropType;
}
