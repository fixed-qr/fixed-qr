import { UpiPaymentParams } from "@/types/upi-payment-params";

function toQueryString(
  params: Record<string, string | number | undefined>,
): string {
  return new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, String(value)]),
  ).toString();
}

export function generateUpiUrl({
  cu = "INR",
  ...params
}: UpiPaymentParams): string {
  return `upi://pay?${toQueryString({
    ...params,
    cu,
  })}`;
}
