import { ImageSourcePropType } from "react-native";

export interface User {
  name: string;
  password: string;
}

export const UPI_APPS = [
  "Paytm",
  "PhonePe",
  "Google Pay",
  "Amazon Pay",
] as const;

export type UpiAppName = (typeof UPI_APPS)[number];

export interface UpiApp {
  upiId: string;
  logo: ImageSourcePropType;
}
