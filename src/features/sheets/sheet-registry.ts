import type React from "react";
import { HistorySheet } from "./sheets/history";
import PrivacyPolicySheet from "./sheets/privacy-policy";
import QrcodeSheet from "./sheets/qr-code";
import QrcodeResultSheet from "./sheets/qr-code/result";
import SavedUpiAppQrcodeSheet from "./sheets/saved-upi-app-qrcode";
import AddUpiSheet from "./sheets/upi/add";

export const sheetRegistry = {
  PrivacyPolicySheet,
  QrcodeSheet,
  QrcodeResultSheet,
  SavedUpiAppQrcodeSheet,
  HistorySheet,
  AddUpiSheet,
} as const;

export type SheetName = keyof typeof sheetRegistry;

export type SheetParamsMap = {
  [K in SheetName]: React.ComponentProps<(typeof sheetRegistry)[K]>;
};
