import { Dimensions, Platform } from "react-native";

export const bottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const screenHeight = Dimensions.get("window").height;
export const screenWidth = Dimensions.get("window").width;
export const maxContentWidth = 800;
