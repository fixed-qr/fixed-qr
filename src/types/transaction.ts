import { UpiAppName } from "./upi-app-name";

export interface Transaction {
  id: string;
  appName: UpiAppName;
  amount: string;
  date: string;
}
