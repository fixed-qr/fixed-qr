import { nanoid } from "nanoid/non-secure";

export function createTransactionId(prefix = "TXN"): string {
  const idPart = nanoid(6).toUpperCase();

  return `${prefix}-${Date.now()}-${idPart}`;
}
