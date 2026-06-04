import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

export type AppIconProps = ComponentProps<typeof Ionicons>;

export function AppIcon(props: Readonly<AppIconProps>) {
  return <Ionicons {...props} />;
}
