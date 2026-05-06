import { nanoid } from "nanoid/non-secure";

export function generateTransactionId(prefix = "TXN") {
  const idPart = nanoid(6).toUpperCase();

  return `${prefix}-${Date.now()}-${idPart}`;
}
