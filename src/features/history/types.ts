import { UpiAppName } from "@/types/upi-app-name";

export interface History {
  id: string;
  appName: UpiAppName;
  amount: string;
  date: string;
}
