import { UpiAppName } from "./upi-app-name";

export type QrCodeResultParams = {
  upiId: string;
  amount?: string;
  appName: UpiAppName;
};
