import type React from "react";
import { HistorySheet } from "../history/sheets";
import { PrivacyPolicySheet } from "../privacy-policy/sheets";
import { SavedUpiQrcodeSheet } from "../saved-upi-app/sheets";
import { QrcodeSheet } from "./sheets/qr-code";
import { QrcodeResultSheet } from "./sheets/qr-code/result";
import { AddUpiSheet } from "./sheets/upi/add";

export const sheetRegistry = {
  PrivacyPolicySheet,
  QrcodeSheet,
  QrcodeResultSheet,
  SavedUpiQrcodeSheet,
  HistorySheet,
  AddUpiSheet,
} as const;

export type SheetName = keyof typeof sheetRegistry;

export type SheetParamsMap = {
  [K in SheetName]: React.ComponentProps<(typeof sheetRegistry)[K]>;
};
