import { ProviderEnum } from "./provider";

export interface Transaction {
  transactionId: string;
  upiId: string;
  provider: ProviderEnum;
  amount: string;
  date: string;
}
