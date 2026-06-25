import type React from "react";
import PrivacyPolicySheet from "./sheets/privacy-policy";
import QrcodeSheet from "./sheets/qr-code";
import QrcodeResultSheet from "./sheets/qr-code/result";
import SavedUpiAppQrcodeSheet from "./sheets/saved-upi-app-qrcode";
import TransactionSheet from "./sheets/transaction";
import AddUpiSheet from "./sheets/upi/add";

export const sheetRegistry = {
  PrivacyPolicySheet,
  QrcodeSheet,
  QrcodeResultSheet,
  SavedUpiAppQrcodeSheet,
  TransactionSheet,
  AddUpiSheet,
} as const;

export type SheetName = keyof typeof sheetRegistry;

export type SheetParamsMap = {
  [K in SheetName]: React.ComponentProps<(typeof sheetRegistry)[K]>;
};
