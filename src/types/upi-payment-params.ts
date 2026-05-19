/**
 * - pa: Payee UPI ID
 * - pn: Payee name
 * - am?: Amount
 * - cu?: Currency (defaults to INR)
 * - tn?: Transaction note
 * - tr?: Transaction reference ID
 * - mc?: Merchant category code
 */
export interface UpiPaymentParams {
  pa: string;
  pn: string;
  am?: number | string;
  cu?: "INR";
  tn?: string;
  tr?: string;
  mc?: string;
}
