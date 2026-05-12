import { Platform } from "react-native";

export const borderRadius = Platform.OS === "ios" ? 28 : 32;
