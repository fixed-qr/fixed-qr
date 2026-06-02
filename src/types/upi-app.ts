import { ImageSourcePropType } from "react-native";

export const UPI_APPS = ["Paytm", "PhonePe", "GooglePay", "AmazonPay"] as const;

export type UpiAppName = (typeof UPI_APPS)[number];

export type UpiAppLogo = Record<UpiAppName, ImageSourcePropType>;

export interface UpiApp {
  upiAppName: UpiAppName;
  upiId: string;
}
