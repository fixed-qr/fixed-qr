import { useTheme } from "@/hooks/use-theme";
import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <NativeTabs
      backgroundColor={theme.background.secondary}
      indicatorColor={theme.accent.subtle}
      labelStyle={{ selected: { color: theme.text.primary } }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/icons/tab/home.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require("@/assets/icons/tab/user-profile.png")}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
