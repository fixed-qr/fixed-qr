import { UpiAppName } from "./upi-app";

export interface Transaction {
  id: string;
  upiApp: UpiAppName;
  amount: number;
  date: string;
}
