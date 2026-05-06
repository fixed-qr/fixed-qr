import { ProviderEnum } from "./provider";

export interface UpiId {
  upiId: string;
  provider: ProviderEnum;
  label: string;
}
