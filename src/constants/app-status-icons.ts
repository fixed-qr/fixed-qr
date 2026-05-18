import { StatusCode } from "@/types/app-status";
import { ImageSourcePropType } from "react-native";

export const AppStatusIcons: Record<StatusCode, ImageSourcePropType> = {
  ok: require("@/assets/icons/app-status/ok.png"),
  maintenance: require("@/assets/icons/app-status/maintenance.png"),
  deprecated: require("@/assets/icons/app-status/deprecated.png"),
  discontinued: require("@/assets/icons/app-status/discontinued.png"),
};
