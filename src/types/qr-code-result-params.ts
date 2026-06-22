import { UpiAppName } from "./upi-app-name";

export type QrCodeResultParams = {
  appName: UpiAppName;
  upiId: string;
  amount?: string;
};
