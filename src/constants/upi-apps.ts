import { UpiApps } from "@/types/upi-app";

export const upiApps: UpiApps = {
  Paytm: {
    upiId: "7970367915@myptm",
    logo: require("@/assets/icons/upi-id-app-logo/paytm.png"),
  },

  PhonePe: {
    upiId: "7970367915@ybl",
    logo: require("@/assets/icons/upi-id-app-logo/phonepe.png"),
  },

  "Google Pay": {
    upiId: "7970367915@okaxis",
    logo: require("@/assets/icons/upi-id-app-logo/google-pay.png"),
  },

  "Amazon Pay": {
    upiId: "7970367915@apl",
    logo: require("@/assets/icons/upi-id-app-logo/amazon-pay.png"),
  },
};
