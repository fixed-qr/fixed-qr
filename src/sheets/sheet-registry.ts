import type React from "react";
import { QrcodeSheet } from "../features/generate-qrcodes/sheets/qrcode";
import { QrcodeResultSheet } from "../features/generate-qrcodes/sheets/qrcode-result";
import { HistorySheet } from "../features/history/sheets";
import { PrivacyPolicySheet } from "../features/privacy-policy/sheets";
import { AddUpiAppSheet, UpiAppQrcodeSheet } from "../features/upi-app/sheets";

export const sheetRegistry = {
  PrivacyPolicySheet,
  QrcodeSheet,
  QrcodeResultSheet,
  UpiAppQrcodeSheet,
  HistorySheet,
  AddUpiAppSheet,
} as const;

export type SheetName = keyof typeof sheetRegistry;

export type SheetParamsMap = {
  [K in SheetName]: React.ComponentProps<(typeof sheetRegistry)[K]>;
};
