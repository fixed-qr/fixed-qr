import { AppIcon, AppIconProps, AppText } from "@/components/app-ui";
import { useTheme } from "@/hooks/use-theme";
import { Pressable, StyleSheet } from "react-native";

type IconName = AppIconProps["name"];

interface SettingProps {
  leftIcon: IconName;
  label: string;
  rightIcon?: IconName;
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
    <Pressable onPress={onPress} style={styles.setting}>
      <AppIcon name={leftIcon} size={18} color={theme.text.primary} />
      <AppText variant="button">{label}</AppText>
      <AppIcon
        name={rightIcon || "arrow-forward"}
        size={18}
        color={theme.text.primary}
        style={{ marginLeft: "auto" }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  setting: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
