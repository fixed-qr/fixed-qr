import { Provider } from "@/types/provider";

export const providers: Provider[] = [
  {
    provider: "paytm",
    label: "Paytm",
    logoImage: require("@/assets/icons/upi-id-app-logo/paytm.png"),
  },
  {
    provider: "phone-pe",
    label: "PhonePe",
    logoImage: require("@/assets/icons/upi-id-app-logo/phone-pe.png"),
  },
  {
    provider: "google-pay",
    label: "GooglePay",
    logoImage: require("@/assets/icons/upi-id-app-logo/google-pay.png"),
  },
  {
    provider: "amazon-pay",
    label: "Amazon Pay",
    logoImage: require("@/assets/icons/upi-id-app-logo/amazon-pay.png"),
  },
];
