import { useTheme } from "@/hooks/use-theme";
import { ComponentProps } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons, ThemedText } from "./ui";

interface SettingProps {
  leftIcon: ComponentProps<typeof Ionicons>["name"];
  label: string;
  rightIcon?: ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
  isLast?: boolean;
}

export function Setting({
  label,
  leftIcon,
  onPress,
  rightIcon,
  isLast,
}: SettingProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.shared,
        styles.setting,
        {
          borderBottomWidth: isLast ? 0 : 1,
          borderColor: theme.background.primary,
        },
      ]}
    >
      <Ionicons name={leftIcon} size={18} color={theme.text.primary} />
      <ThemedText>{label}</ThemedText>
      <Ionicons
        name={rightIcon || "arrow-forward"}
        size={18}
        color={theme.text.primary}
        style={{ marginLeft: "auto" }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shared: {
    backgroundColor: "transparent",
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
  },
});
