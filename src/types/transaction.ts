import { Provider } from "./provider";

export interface Transaction {
  transactionId: string;
  provider: Provider;
  upiId: string;
  amount: number;
  date: string;
}
