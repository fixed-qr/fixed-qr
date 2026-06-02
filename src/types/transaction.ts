import { UpiAppName } from "./upi-app";

export interface Transaction {
  id: string;
  upiAppName: UpiAppName;
  amount: number;
  date: string;
}
