import { useTheme } from "@/hooks/use-theme";
import { Stack } from "expo-router";

export default function SystemLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: { backgroundColor: theme.background.primary },
      }}
    >
      <Stack.Screen name="update" />
    </Stack>
  );
}
