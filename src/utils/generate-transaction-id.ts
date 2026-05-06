export function generateTransactionId(prefix = "TXN") {
  const idPart = crypto
    .randomUUID()
    .replaceAll("-", "")
    .slice(0, 6)
    .toUpperCase();

  return `${prefix}-${Date.now()}-${idPart}`;
}