import { Provider } from "@/types/provider";

export const providers: Provider[] = [
  {
    provider: "paytm",
    label: "Paytm",
    logoImage: require("@/assets/images/logo/paytm.png"),
  },
  {
    provider: "phone-pe",
    label: "PhonePe",
    logoImage: require("@/assets/images/logo/phone-pe.png"),
  },
  {
    provider: "google-pay",
    label: "GooglePay",
    logoImage: require("@/assets/images/logo/google-pay.png"),
  },
  {
    provider: "amazon-pay",
    label: "Amazon Pay",
    logoImage: require("@/assets/images/logo/amazon-pay.png"),
  },
];
